import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export function getSafeHtml(sanitizer: DomSanitizer, content: string): SafeHtml {
  return sanitizer.bypassSecurityTrustHtml(content);
}