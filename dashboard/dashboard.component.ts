import { Component, OnInit } from '@angular/core';
import { UrlShortnerService } from 'src/app/shared/url-shortner.service';
import { GeneratedUrl } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  url: string = '';
  originalUrl: string = '';
  isUrlGenerated: boolean = false;
  showMessage: boolean = false;
  message: { type: string; content: string } = { type: '', content: '' };
  shortUrl: string = '';
  urls: typeof GeneratedUrl[] = [];

  constructor(private urlShortnerService: UrlShortnerService) {}

  ngOnInit(): void {
    this.isUrlGenerated = false;
    this.getAllGeneratedUrls();
  }

  /**
   * Method to retrieve the source URL for the given target shortened URL
   *
   * @param   {number}  id  [id description]
   *
   * @return  {[type]}      [return description]
   */
  getUrlByShortUrl(id: number) {
    this.urlShortnerService
      .updateTotalVisits(id)
      .subscribe((res: typeof GeneratedUrl) => {
        window.open(res.originalurl, '_blank');
        this.urls.forEach((item) => {
          if (item.id == res.id) {
            item.visits = res.visits;
          }
        });
      });
  }

  /**
   * Method to generate the shortened URL for the given URL
   *
   * @return  {[type]}  [return description]
   */
  generateShortUrl() {
    this.urlShortnerService.getShortUrl(this.url).subscribe(
      (res) => {
        if (res == null) {
          this.noDataHandler();
        } else {
          this.isUrlGenerated = true;
          this.showMessage = false;
          this.shortUrl = res.shorturl;
          this.originalUrl = res.originalurl;
        }
      },
      (err) => {
        this.handleError(err);
      },
      () => {
        this.getAllGeneratedUrls();
      }
    );
  }

  /**
   * Method to retrieve all the generated URLs
   *
   * @return  {[type]}  [return description]
   */
  getAllGeneratedUrls() {
    this.urlShortnerService.getUrls().subscribe(
      (res) => {
        if (res == null) {
          this.noDataHandler();
        }
        this.urls = res;
        if (this.urls.length > 0) {
          this.isUrlGenerated = true;
          this.showMessage = false;
        }
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  /**
   * Method to verify if the URL is expired
   *
   * @param   {string}  expiryAt  [expiryAt description]
   *
   * @return  {[type]}            [return description]
   */
  isExpired(expiryAt: string) {
    const expiryDate = new Date(expiryAt);

    if (expiryDate.valueOf() < new Date().valueOf()) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Method to delete the URL
   *
   * @param   {number}  id  [id description]
   *
   * @return  {[type]}      [return description]
   */
  deleteUrl(id: number) {
    this.urlShortnerService.deleteUrl(id).subscribe(
      (res) => {
        this.message.type = 'success';
        this.message.content = 'Item deleted successfully.';
      },
      (err) => {
        this.handleError(err);
      }
    );
  }

  handleError(err: any) {
    this.isUrlGenerated = false;
    this.showMessage = true;
    this.message.type = 'error';
    this.message.content = err;
  }

  noDataHandler() {
    this.showMessage = true;
    this.message.type = 'error';
    this.message.content = 'No data returned. Please try again.';
  }
}
