import { Injectable } from '@angular/core';
import { Article } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class DataLocalService {
	noticias: Article[] = [];

	constructor(private storage: Storage, private toastCtrl: ToastController) {
		this.cargarFavoritos();
	}

	guardarNoticias(noticia: Article) {
		const existe = this.noticias.find(noti => noti.title === noticia.title);

		if (!existe) {
			this.noticias.unshift(noticia);
			this.storage.set('favoritos', this.noticias);
			this.mostrarToast('Agregado a favoritos');
			return;
		}
		this.mostrarToast('Esta noticia ya esta agregada a favoritos');
	}

	async cargarFavoritos() {
		const favoritos = await this.storage.get('favoritos');

		if (favoritos) {
			this.noticias = favoritos;
		}
	}

	borrarNoticia(noticia: Article) {
		this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
		this.storage.set('favoritos', this.noticias);
		this.mostrarToast('Noticia Borrada');
	}

	async mostrarToast(message: string) {
		const toast = await this.toastCtrl.create({
			message,
			duration: 2000,
			color: 'light'
		});
		toast.present();
	}
}
