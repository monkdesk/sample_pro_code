import React, { Component } from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonText, IonPage, IonTitle, IonToolbar, IonBackButton,
  IonIcon, IonButton,IonFooter,IonTabs, IonTabBar, IonTabButton,IonBadge,IonRouterOutlet,
  IonTab,IonSegment,IonSegmentButton,IonSlides,IonSlide,IonThumbnail,IonSkeletonText,
  IonCard, IonCardContent, IonCardHeader, IonSearchbar, IonCardTitle} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import RunDetails from '../RunDetails/RunDetails';
import {SuperTabs,SuperTab} from 'ionic2-super-tabs';

import axios from 'axios';

interface AppProps { 
history:any;
}

interface AppState {
    [x: number]: any;
    AllOver:any;
    Top5Man:any;
    Top5Woman:any;
    Top5Cycle:any;
    Top5Runner:any;
    Top5Walking:any;
    slideIndex :any;
    segment:any;
    Year:any;
    filterData:any;
    StringFil:any;
    Gender_type:any
   
}
      
class LeadershipBoard extends React.Component<AppProps, AppState>{
    constructor(props:any) {
        super(props);
        this.state = {
          AllOver:[],
          Top5Man:[],
          Top5Woman:[],
          Top5Cycle:[],
          Top5Runner:[],
          Top5Walking:[],
          slideIndex:0,
          segment:0,
          Year:2020,
          filterData:[],
          StringFil:'',
          Gender_type:''
        };
     
      }
  
      async componentDidMount(){
        let init:any = {
          method: 'POST',
          headers: { 'content-type': 'multipart/form-data',
                      'Accept': 'application/json'},
          mode: 'cors',
          cache: 'default',
          dataType: 'json',
          async:    true,
        };
        //let {Year} = this.state;
        let Year:any = localStorage.getItem('Year');
        if(Year == '' || Year == null){
          Year = '2020';
        }
        let {Gender_type} = this.state;
        if(Gender_type == ''){
          Gender_type = 'all';
        }
      
        let formData = new FormData();
        formData.append('year',Year);
        formData.append('gender_type',Gender_type);
        axios.post("https://login.cyruns.com/api/api.php?action=leadershipboard",formData,init)
        .then(response => {
       
          if(response.data.msgcode == '0'){
            //console.log(response.data);
            this.setState({Top5Man:response.data.top_5_men,
                          Top5Woman:response.data.top_5_women,
                          Top5Cycle:response.data.top_5_cyclist,
                          Top5Runner:response.data.top_5_runners,
                          Top5Walking:response.data.top_5_walking });
          }
        })
        .catch(error => {
          //console.log("Errors"+error);
          });

          axios.post("https://login.cyruns.com/api/api.php?action=alloverleardership",formData,init)
          .then(response => {
            if(response.data.msgcode == '0'){
              this.setState({AllOver:response.data.top_all})
              //console.log(response.data.top_all);
            }
          })
          .catch(error => {
            console.log("Errors"+error);
            });

        }

    YearChange(e:any){
      this.setState({Year:e,AllOver:[]});
      localStorage.setItem('Year',e);
      this.componentDidMount();
  }
  onGenderChange(e:any){
    this.setState({Gender_type:e.target.value,Top5Cycle:[],Top5Runner:[],Top5Walking:[]});
    this.componentDidMount();

    //console.log(e.target.value);
  }     
  FilterData(e:any){
    let value:any = e.target.value;
    let mydata = this.state.AllOver; 
    let filterData = [];
    filterData = mydata.filter((location:any) => {
      return( (location.user_firstname+' '+location.user_lastname).toLowerCase().indexOf(value.toLowerCase()) > -1
      || location.user_lastname.toLowerCase().indexOf(value.toLowerCase()) > -1
      || location.w_meters.toLowerCase().indexOf(value.toLowerCase()) > -1);
    });
    //console.log(filterData);
    this.setState({filterData:filterData,StringFil:value});
  }
 IonSegmentChange(e:any){
  //console.log(e.target.value);
  this.setState({segment:e.target.value,Gender_type:'all'});

 }
slideChanged(e:any) {
 e.getActiveIndex()
  .then((activeIndex:any )=> {
   // console.log('active index = ', activeIndex );
  this.setState({slideIndex:activeIndex})
});
}
     
    render(){
      const {Top5Man,Top5Woman,Top5Cycle,Top5Runner,Top5Walking,segment,slideIndex,AllOver,
        filterData,StringFil,Gender_type} = this.state;
      let Year:any = localStorage.getItem('Year');
      const SegmentValue = parseInt(segment);
      //console.log(AllOver);
      const searchbar = document.querySelector('ion-searchbar');
    
      const slideOpts = {
        initialSlide:0,
        speed: 400
      };
        return(
        <IonPage>
        <div className='screen_main'>
        <IonHeader>
          <IonToolbar className='page_header'>
            <IonBackButton defaultHref='/home'></IonBackButton>
            <IonTitle>Leadership Board</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent >
    <div className='page_contain'>
    
  




    <IonSegment scrollable={true} className='segment_main' onIonChange={(e)=>this.IonSegmentChange(e)}>
      <IonSegmentButton value="0" checked={SegmentValue == 0?true:false}>
        <IonLabel>All</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="1" >
        <IonLabel>Men</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="2">
        <IonLabel>Women</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="3">
        <IonLabel>Cyclists</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="4">
        <IonLabel>Runners</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="5">
        <IonLabel>Walking</IonLabel>
      </IonSegmentButton>
    </IonSegment>

    <div className='leadership_main'>
      {
        SegmentValue == 0?
        <IonCard className='board_box'>
        <IonCardHeader className='boardbox_head'>
          <IonCardTitle>resolution {Year!=''&& Year!=null?Year:2020} leaderboard</IonCardTitle>
          <IonSearchbar autocomplete="on" showCancelButton="focus" inputmode="text"
          onInput={(e)=>this.FilterData(e)}></IonSearchbar>
        </IonCardHeader>
        <IonCardContent className='boardbox_content'>
          {StringFil!='' && filterData != null?
           filterData.map((all:any,i:any)=>{
            return <div key={i} className='board_wrap'>
                    <div className='board_index'><p>{i+1}.</p> </div>
                    <div className='board_name'>
                     <p>{all.user_firstname +' '+ all.user_lastname}</p>
                    </div>
                    <div className='board_meter'>
                      <p>{all.w_meters}</p>
                    </div>
                  </div>
          }):
          AllOver!='' && AllOver !=null?
          AllOver.map((all:any,i:any)=>{
            return <div key={i} className='board_wrap'>
                    <div className='board_index'><p>{i+1}.</p> </div>
                    <div className='board_name'>
                     <p>{all.user_firstname +' '+ all.user_lastname}</p>
                    </div>
                    <div className='board_meter'>
                      <p>{all.w_meters}</p>
                    </div>
                  </div>
          })
          :<Loader/>} 
        </IonCardContent>
      </IonCard>:
      SegmentValue == 1?
        <IonCard className='board_box'>
        <IonCardHeader className='boardbox_head'>
          <IonCardTitle>top 5 men</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className='boardbox_content'>
          {Top5Man!='' && Top5Man !=null?
          Top5Man.map((man:any,i:any)=>{
            return <div key={i} className='board_wrap'>
                    <div className='board_index'><p>{i+1}.</p> </div>
                    <div className='board_name'>
                     <p>{man.user_firstname +' '+ man.user_lastname}</p>
                    </div>
                    <div className='board_meter'>
                      <p>{man.w_meters}</p>
                    </div>
                  </div>
          })
          :<Loader/>}
        </IonCardContent>
      </IonCard>:
      SegmentValue == 2?
      <IonCard className='board_box'>
      <IonCardHeader className='boardbox_head'>
        <IonCardTitle>top 5 women</IonCardTitle>
      </IonCardHeader>
      <IonCardContent className='boardbox_content'>
        {Top5Woman!='' && Top5Woman !=null?
        Top5Woman.map((man:any,i:any)=>{
          return <div key={i} className='board_wrap'>
                  <div className='board_index'><p>{i+1}.</p> </div>
                  <div className='board_name'>
                   <p>{man.user_firstname +' '+ man.user_lastname}</p>
                  </div>
                  <div className='board_meter'>
                    <p>{man.w_meters}</p>
                  </div>
                </div>
        })
        :<Loader/>}
      </IonCardContent>
    </IonCard>:
     SegmentValue == 3?
     <div>
     <IonSegment  onIonChange={(e)=>this.onGenderChange(e)} className='sub_segment'>
     <IonSegmentButton value="all" className='sub_segment_btn' checked={Gender_type==''||Gender_type=='all'?true:false}>
       <IonLabel>All</IonLabel>
     </IonSegmentButton>
     <IonSegmentButton value="1" className='sub_segment_btn' checked={Gender_type=='1'?true:false}>
       <IonLabel>Men</IonLabel>
     </IonSegmentButton>
     <IonSegmentButton value="2" className='sub_segment_btn' checked={Gender_type=='2'?true:false}>
       <IonLabel>Women</IonLabel>
     </IonSegmentButton>
     </IonSegment>
     <IonCard className='board_box'>
     <IonCardHeader className='boardbox_head'>
       <IonCardTitle>top 5 Cyclists</IonCardTitle>
     </IonCardHeader>
     <IonCardContent className='boardbox_content'>
       {Top5Cycle!='' && Top5Cycle !=null?
       Top5Cycle.map((man:any,i:any)=>{
         return <div key={i} className='board_wrap'>
                 <div className='board_index'><p>{i+1}.</p> </div>
                 <div className='board_name'>
                  <p>{man.user_firstname +' '+ man.user_lastname}</p>
                 </div>
                 <div className='board_meter'>
                   <p>{man.w_meters}</p>
                 </div>
               </div>
       })
       :<Loader/>}
     </IonCardContent>
   </IonCard>
   </div>:
    SegmentValue == 4?
    <div>
       <IonSegment  onIonChange={(e)=>this.onGenderChange(e)} className='sub_segment'>
     <IonSegmentButton value="all" className='sub_segment_btn' checked={Gender_type==''||Gender_type=='all'?true:false}>
       <IonLabel>All</IonLabel>
     </IonSegmentButton>
     <IonSegmentButton value="1" className='sub_segment_btn' checked={Gender_type=='1'?true:false}>
       <IonLabel>Men</IonLabel>
     </IonSegmentButton>
     <IonSegmentButton value="2" className='sub_segment_btn' checked={Gender_type=='2'?true:false}>
       <IonLabel>Women</IonLabel>
     </IonSegmentButton>
     </IonSegment>
    <IonCard className='board_box'>
     <IonCardHeader className='boardbox_head'>
       <IonCardTitle>top 5 Runners</IonCardTitle>
     </IonCardHeader>
     <IonCardContent className='boardbox_content'>
       {Top5Runner!='' && Top5Runner !=null?
       Top5Runner.map((runur:any,i:any)=>{
         return <div key={i} className='board_wrap'>
                 <div className='board_index'><p>{i+1}.</p> </div>
                 <div className='board_name'>
                  <p>{runur.user_firstname +' '+ runur.user_lastname}</p>
                 </div>
                 <div className='board_meter'>
                   <p>{runur.w_meters}</p>
                 </div>
               </div>
       })
       :<Loader/>}
     </IonCardContent>
   </IonCard>
   </div>:
   SegmentValue == 5?
   <div>
      <IonSegment  onIonChange={(e)=>this.onGenderChange(e)} className='sub_segment'>
     <IonSegmentButton value="all" className='sub_segment_btn' checked={Gender_type==''||Gender_type=='all'?true:false}>
       <IonLabel>All</IonLabel>
     </IonSegmentButton>
     <IonSegmentButton value="1" className='sub_segment_btn' checked={Gender_type=='1'?true:false}>
       <IonLabel>Men</IonLabel>
     </IonSegmentButton>
     <IonSegmentButton value="2" className='sub_segment_btn' checked={Gender_type=='2'?true:false}>
       <IonLabel>Women</IonLabel>
     </IonSegmentButton>
     </IonSegment>
   <IonCard className='board_box'>
   <IonCardHeader className='boardbox_head'>
     <IonCardTitle>top 5 Walking</IonCardTitle>
   </IonCardHeader>
   <IonCardContent className='boardbox_content'>
     {Top5Walking!='' && Top5Walking !=null?
     Top5Walking.map((walk:any,i:any)=>{
       return <div key={i} className='board_wrap'>
               <div className='board_index'><p>{i+1}.</p> </div>
               <div className='board_name'>
                <p>{walk.user_firstname +' '+ walk.user_lastname}</p>
               </div>
               <div className='board_meter'>
                 <p>{walk.w_meters}</p>
               </div>
             </div>
     })
     :<Loader/>}
   </IonCardContent>
 </IonCard>
 </div>:
     null }
  
    </div>
    
     
        
   <div className='clr'></div>
     
  </div>
       <div className='year_btn'>
               <div className='year_text'>
                   <p>See Year Wise Leaderboard</p>
               </div>
              <IonButton className={Year == '2019'?'active_year_btn':''} onClick={()=>this.YearChange(2019)}>2019</IonButton>
               
              <IonButton className={Year != '2019'?'active_year_btn':''} onClick={()=>this.YearChange(2020)}>2020</IonButton>
            </div>
     
        </IonContent>
          <IonFooter translucent={true} >
            
          </IonFooter>
        </div>
        </IonPage>
        )
    }
}

class Loader extends React.Component{
  render(){
    return(
      <div>
         <IonItem lines='none'>
            <IonLabel>
              <p>
                <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
              </p>
              <p>
                <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
              </p>
            </IonLabel>
          </IonItem>
          <IonItem lines='none'>
            <IonLabel>
              <p>
                <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
              </p>
              <p>
                <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
              </p>
              <p>
                <IonSkeletonText animated style={{width:" 100% "}}></IonSkeletonText>
              </p>
            </IonLabel>
          </IonItem>
      </div>
    )
  }
}
export default LeadershipBoard;