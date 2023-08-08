import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts:Post[] = [];
  isFetching:boolean = false;
  error:null|string = null;
  errorSub!:Subscription;

  constructor(private http: HttpClient,
    private postsService: PostsService) {}
  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(
      (msg:string)=> {
        this.error = msg;
      }
    )
    this.isFetching = true;
    this.SubscribeToFetch();


  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    this.isFetching = true;
    this.SubscribeToFetch();
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(
      ()=> {
        this.loadedPosts = [];
      }
    )
  }

  onHandleError() {
    this.error = null;
  }

  private SubscribeToFetch() {
    this.postsService.fetchPost().subscribe(
      {
        next: (posts) => {
          this.error=null;
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        error: (error) => {
          this.isFetching = false;
          this.error = error.message;
        },
        complete: () =>  console.log("Completed Fetching Posts!") 
    }   
    );
  }
  
}
