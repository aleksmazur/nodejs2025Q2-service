import { Injectable, LoggerService, OnModuleDestroy } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

@Injectable()
export class LoggingService implements LoggerService, OnModuleDestroy {
  private logLevel: LogLevel;
  private logFilePath: string | null = null;
  private maxFileSizeKB: number;
  private useFileLogging: boolean;
  private logStream: fs.WriteStream | null = null;

  constructor() {
    const levelStr = (process.env.LOG_LEVEL || 'INFO').toUpperCase();
    this.logLevel =
      LogLevel[levelStr as keyof typeof LogLevel] ?? LogLevel.INFO;

    const logFile = process.env.LOG_FILE;
    this.useFileLogging = !!logFile;
    this.maxFileSizeKB = parseInt(
      process.env.LOG_FILE_MAX_SIZE_KB || '1024',
      10,
    );

    if (this.useFileLogging && logFile) {
      this.logFilePath = path.isAbsolute(logFile)
        ? logFile
        : path.join(process.cwd(), logFile);

      const logDir = path.dirname(this.logFilePath);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }

      this.logStream = fs.createWriteStream(this.logFilePath, { flags: 'a' });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private formatMessage(level: string, message: any, context?: string): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    const messageStr =
      typeof message === 'object'
        ? JSON.stringify(message, null, 2)
        : String(message);
    return `${timestamp} [${level}] ${contextStr} ${messageStr}\n`;
  }

  private writeLog(level: string, message: any, context?: string): void {
    const formattedMessage = this.formatMessage(level, message, context);

    if (this.useFileLogging) {
      this.rotateLogFileIfNeeded();

      if (this.logStream) {
        this.logStream.write(formattedMessage);
      } else {
        process.stdout.write(formattedMessage);
      }
    } else {
      process.stdout.write(formattedMessage);
    }
  }

  private rotateLogFileIfNeeded(): void {
    if (!this.logFilePath || !this.logStream) {
      return;
    }

    try {
      if (!fs.existsSync(this.logFilePath)) {
        this.logStream = fs.createWriteStream(this.logFilePath, { flags: 'a' });
        return;
      }

      const stats = fs.statSync(this.logFilePath);
      const fileSizeKB = stats.size / 1024;

      if (fileSizeKB >= this.maxFileSizeKB) {
        this.logStream.end();
        this.logStream = null;

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const ext = path.extname(this.logFilePath);
        const baseName = path.basename(this.logFilePath, ext);
        const dir = path.dirname(this.logFilePath);
        const rotatedFileName = `${baseName}-${timestamp}${ext}`;
        const rotatedFilePath = path.join(dir, rotatedFileName);

        try {
          fs.renameSync(this.logFilePath, rotatedFilePath);
        } catch (renameError) {}

        this.logStream = fs.createWriteStream(this.logFilePath, { flags: 'a' });
      }
    } catch (error) {
      if (this.logFilePath) {
        try {
          this.logStream = fs.createWriteStream(this.logFilePath, {
            flags: 'a',
          });
        } catch (e) {
          this.useFileLogging = false;
          this.logStream = null;
        }
      }
    }
  }

  error(message: any, trace?: string, context?: string): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      const fullMessage = trace ? `${message}\n${trace}` : message;
      this.writeLog('ERROR', fullMessage, context);
    }
  }

  warn(message: any, context?: string): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.writeLog('WARN', message, context);
    }
  }

  log(message: any, context?: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.writeLog('INFO', message, context);
    }
  }

  debug(message: any, context?: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.writeLog('DEBUG', message, context);
    }
  }

  verbose(message: any, context?: string): void {
    if (this.shouldLog(LogLevel.VERBOSE)) {
      this.writeLog('VERBOSE', message, context);
    }
  }

  onModuleDestroy(): void {
    if (this.logStream) {
      this.logStream.end();
    }
  }
}
