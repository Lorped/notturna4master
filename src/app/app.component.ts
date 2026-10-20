import { Component, ChangeDetectionStrategy, DestroyRef, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    const listeners = [
      Keyboard.addListener('keyboardWillShow', (info) =>
        this.setKeyboardOffset(info.keyboardHeight)
      ),
      Keyboard.addListener('keyboardWillHide', () => this.setKeyboardOffset(0)),
    ];
    inject(DestroyRef).onDestroy(() =>
      listeners.forEach((l) => l.then((h) => h.remove()))
    );
  }

  // Con edge-to-edge la WebView non si ridimensiona: lasciamo spazio alla tastiera
  private setKeyboardOffset(height: number) {
    document
      .querySelectorAll<HTMLElement>('ion-content')
      .forEach((el) => el.style.setProperty('--keyboard-offset', `${height}px`));
    if (height > 0) {
      setTimeout(() => {
        const active = document.activeElement as HTMLElement | null;
        active?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 100);
    }
  }
}
