import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  communities = [];
  homeData=[];
  communityAndHomeData=[];
  averagePrice=0;
  count=0;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getCommunity();

  }

  getCommunity():void{
    this.apiService.getCommunityService().subscribe((data: any[])=>{   
      this.communities = data;
      this.getHomes();
    })
  }
  getHomes():void{

    this.apiService.getHomeService().subscribe((data: any[])=>{   
      this.homeData = data;
      this.getCommunityAndHomes();
    })
  }
  getCommunityAndHomes()
  {
    this.communities.forEach(community => {
      this.homeData.forEach(homes=>{
        if(community.id==homes.communityId)
        {
          this.count++;
          this.averagePrice+=homes.price;
          
          
        }
      })
      this.averagePrice=this.averagePrice/this.count;
    
      this.communityAndHomeData.push({'communities':community,'averagePrice':''+this.averagePrice+''});
     
      console.log(this.communityAndHomeData);
      this.averagePrice=0;
    });
  }
  
}
