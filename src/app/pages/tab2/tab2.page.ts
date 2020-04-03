import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	@ViewChild(IonSegment, { static: false }) segment: IonSegment;
	noticias: Article[] = [];

	categorias = [
		'business',
		'entertainment',
		'general',
		'health',
		'science',
		'sports',
		'technology'
	];

	constructor(private noticiasService: NoticiasService) {}

	ionViewDidEnter() {
		this.segment.value = this.categorias[0];
		this.cargarNoticias(this.segment.value);
	}

	cambioCategoria(event) {
		this.noticias = [];
		this.cargarNoticias(event.detail.value);
	}

	cargarNoticias(categoria: string, event?) {
		this.noticiasService.getTopHeadlineCategoria(categoria).subscribe(resp => {
			this.noticias.push(...resp.articles);
			if (event) {
				event.target.complete();
			}
		});
	}

	loadData(event) {
		this.cargarNoticias(this.segment.value, event);
	}
}
