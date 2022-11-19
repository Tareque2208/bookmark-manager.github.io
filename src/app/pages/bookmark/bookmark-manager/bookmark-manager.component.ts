import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-bookmark-manager',
  templateUrl: './bookmark-manager.component.html',
  styleUrls: ['./bookmark-manager.component.scss'],
})
export class BookmarkManagerComponent implements OnInit {
  editedItemId!: number;
  isEditMode!: boolean;
  editedItem: any;
  previousDatas: any = [];
  localBookmarkList: any = [];
  isAddBookmarkVisible: boolean = false;
  isAddNewCategory: boolean = false;
  addBookmarkForm: FormGroup;
  selectedCategory: any = 0;


  categoryList: { id: number; name: string,data: [] }[] = [
    { id: 1, name: 'You better see this one', data: [] },
    { id: 2, name: 'Booom ! ! !',data: [] },
    { id: 3, name: 'Wanna play a game?',data: [] },
  ];

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
  ) {

    this.addBookmarkForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      selectedCategoryId: [''],
      newCategoryName: ['']
    });
  }

  ngOnInit() {
    this.sortingoutAllDatas();
  }

  //#region modal
  sortingoutAllDatas(): void {
    this.getItem();
    this.categoryList.forEach((item:any, index:number)=>{
      item["data"] = this.fiterCategoryWise(item.id);
    })
  }
  showModal(): void {
    this.isAddBookmarkVisible = true;
  }

  handleCancel(): void {
    this.isAddBookmarkVisible = false;
    this.addBookmarkForm.reset();
  }

  addNewCategory(): void {
    this.isAddNewCategory = true;
    this.addBookmarkForm.reset();
  }

  getItem(): any {
    // console.log(JSON.parse(localStorage.getItem('datas')));
    let storageData = [];
    let localData = localStorage.getItem("datas");
    if (localData !== null && localData?.length > 0) {
      storageData = JSON.parse(localData);
    }
    return storageData;
  }

  submitForm() {
    if(this.addBookmarkForm.controls['selectedCategoryId'].value || this.addBookmarkForm.controls['newCategoryName'].value){

      let bookmarks: any[] = [];
      // if(this.addBookmarkForm.controls['newCategoryName'].value){
      //   console.log(this.addBookmarkForm.controls['newCategoryName'].value);
      //   this.addingNewCategory(this.addBookmarkForm.controls['newCategoryName'].value);
      // }
  
      let savedData = localStorage.getItem("datas");
      console.log(savedData, savedData?.length);
      if (savedData !== null && savedData?.length > 1) {
        let parsedData = JSON.parse(savedData);
        let obj = { ...this.addBookmarkForm.value };
        bookmarks = [obj, ...parsedData];
      } else {
        bookmarks = [this.addBookmarkForm.value];
      }
  
      localStorage.setItem("datas", JSON.stringify(bookmarks));
      
      this.sortingoutAllDatas();
      this.addBookmarkForm.reset();
      this.isAddBookmarkVisible = false;
      this.notification.success('Congratulations!!! ', 'Your data is saved');
    }else{
      this.notification.error('Sorry!!! ', 'You must provide category');
    }

  }

  fiterCategoryWise(id: number) {
    return this.getItem()?.filter((obj: any) => obj.selectedCategoryId == id);
  }

  addingNewCategory(value: string) {
    const sorted = this.categoryList.sort((f,s) => s.id);
    let res = this.getMaxValueKey(this.categoryList);
    console.log("res", Math.max(...this.categoryList.keys()));
    // let obj = {
    //   id:
    // }
    // this.categoryList.push(id: sorted+1, name: value);
  }

  getMaxValueKey( data: any): string {
    console.log();
    return Object.keys(data).reduce((a, b) => data[a] > data[b] ? a : b);
  }
  
  showDetails(details:any){
    this.selectedCategory = details;
    console.log("details", details);
    let obj = this.categoryList.find((cat) => cat.id === this.selectedCategory.selectedCategoryId);
    console.log("objaaaaaa", obj);

  }
}