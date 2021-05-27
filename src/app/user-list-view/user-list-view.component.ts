import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { ActivityService } from '../services/activity.service';
import { activityDTO } from '../models/activityDTO';
import { userDTO } from '../models/userDTO';
import { userSearchParams } from '../models/userSearchParams'; 
import { IPagination } from '../models/IPagination';


@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent implements OnInit {

  pageIndex: number = 1;
  pageSize : number = 10;
  totalCount: number = 0;
  sortName : string = "firstNameAsc";
  activityId: number = 0;


  pageSizeArr: any[] = [
    { pageSize : 10, pageSizeName : "10" },
    { pageSize : 20, pageSizeName : "20" },
    { pageSize : 30, pageSizeName : "30" },
    { pageSize : 40, pageSizeName : "40" },
    { pageSize : 50, pageSizeName : "50" },
  ];

  sortArr: any[] = [
  { sortName : "firstNameAsc",     sortDisplayName : "First Name Asc" },
  { sortName : "firstNameDesc",    sortDisplayName : "First Name Desc" },
  { sortName : "lastNameAsc",      sortDisplayName : "Last Name Asc" },
  { sortName : "lastNameDesc",     sortDisplayName : "Last Name Desc" },
  { sortName : "emailAddressAsc",  sortDisplayName : "Email Addres Asc" },
  { sortName : "emailAddressDesc", sortDisplayName : "Email Addres Desc" }
];

activityDTOArr: activityDTO[] = [];
userDTOArr: userDTO[]  =[];


  constructor(private httpClient: HttpClient,  private usersService: UsersService,
        private activityService: ActivityService ) { }

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe( response => {
      this.activityDTOArr  = [{ activityId: 0, activityName : "Please select activity" }, ... response] ;

    }, error => {
      console.log(error);
    });

    this.searchUsers();
  }

  searchUsers( )
  {

    let userParams = new userSearchParams();

    userParams.pageIndex = this.pageIndex;
    userParams.pageSize = this.pageSize;
    userParams.sortName = this.sortName;

    console.log(" Page Size: " + this.pageSize);

    if ( this.activityId > 0)
    {
      userParams.activityId = this.activityId;
    } else {
      userParams.activityId = null;
    }
    

    this.usersService.getUsers(userParams).subscribe( response => {
      // this.products = response.data;
      // this.shopParams.pageNumber = response.pageIndex;
      // this.shopParams.pageSize = response.pageSize;
      // this.totalCount = response.count;
      this.userDTOArr = response.data;
      this.totalCount = response.count;
      this.pageIndex = response.pageIndex;
      this.pageSize = response.pageSize;

      console.log("get user call back .");
      console.log( response.data);

    }, error => {
        console.log(error);
    });

  }


  onSearch() {
    // this.shopParams.search = this.searchTerm.nativeElement.value;
    // this.shopParams.pageNumber = 1;
    // this.getProducts();
  }


  onReset() {
    // this.searchTerm.nativeElement.value = '';
    // this.shopParams = new ShopParams();
    // this.getProducts();
  }


 


  onSortNameChanged()
  {
    this.pageIndex = 1;
    this.searchUsers( );
    
  }

  
  onActivityChanged()
  {
    this.pageIndex = 1;
    this.searchUsers( );
  }

  onPageSizeChanged()
  {
    this.pageIndex = 1;
    this.searchUsers( );
  }

  onPageChanged(event: any)
  {
    
    this.pageIndex = event.page;
    this.searchUsers( );

    // if ( this.pageIndex !== event)
    // {
    //   this.pageIndex = event;
    //   this.searchUsers();
    // }

  }


}
