import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from "@angular/material/dialog";
import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { LoginFormsComponent } from './components/forms/login-forms/login-forms.component';
import { RegisterFormsComponent } from './components/forms/register-forms/register-forms.component';
import { HeaderComponent } from './components/structure/header/header.component';
import { LateralBarComponent } from './components/structure/lateral-bar/lateral-bar.component';
import { ServiceRowComponent } from './components/structure/service-row/service-row.component';
import { ServiceCardComponent } from './components/cards/service-card/service-card.component';
import { ActiveUserPageComponent } from './components/pages/active-user-page/active-user-page.component';
import { UserPageComponent } from './components/pages/user-page/user-page.component';
import { UserBasicInfoComponent } from './components/cards/user-basic-info/user-basic-info.component';
import { ServicePageComponent } from './components/pages/service-page/service-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissingInfoDialogComponent } from './components/dialogs/missing-info-dialog/missing-info-dialog.component';
import { WrongCredentialsDialogComponent } from './components/dialogs/wrong-credentials-dialog/wrong-credentials-dialog.component';
import { EditUserDialogComponent } from './components/dialogs/edit-user-dialog/edit-user-dialog.component';
import { FailedUpdateDialogComponent } from './components/dialogs/failed-update-dialog/failed-update-dialog.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { SettingsPageComponent } from './components/pages/settings-page/settings-page.component';
import { MyServicesPageComponent } from './components/pages/my-services-page/my-services-page.component';
import { StarRatingComponent } from './components/controls/star-rating/star-rating.component';
import { ReviewLateralListComponent } from './components/structure/review-lateral-list/review-lateral-list.component';
import { WeekdaySelectorComponent } from './components/controls/weekday-selector/weekday-selector.component';
import { CreateServiceDialogComponent } from './components/dialogs/create-service-dialog/create-service-dialog.component';
import { ScheduleServiceDialogComponent } from './components/dialogs/schedule-service-dialog/schedule-service-dialog.component';
import { RequestForProviderCardComponent } from './components/cards/request-for-provider-card/request-for-provider-card.component';
import { InstanceForProviderCardComponent } from './components/cards/instance-for-provider-card/instance-for-provider-card.component';
import { TimePickerComponent } from './components/controls/time-picker/time-picker.component';
import { RequestsForProviderListComponent } from './components/structure/requests-for-provider-list/requests-for-provider-list.component';
import { InstancesForProviderListComponent } from './components/structure/instances-for-provider-list/instances-for-provider-list.component';
import { ServicesForProviderListComponent } from './components/structure/services-for-provider-list/services-for-provider-list.component';
import { FullServiceCardComponent } from './components/cards/full-service-card/full-service-card.component';
import { EditServiceDialogComponent } from './components/dialogs/edit-service-dialog/edit-service-dialog.component';
import { RequestForClientComponent } from './components/cards/request-for-client/request-for-client.component';
import { RequestsForUserListComponent } from './components/structure/requests-for-user-list/requests-for-user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainPageComponent,
    LoginFormsComponent,
    RegisterFormsComponent,
    HeaderComponent,
    LateralBarComponent,
    ServiceRowComponent,
    ServiceCardComponent,
    ActiveUserPageComponent,
    UserPageComponent,
    ServicePageComponent,
    MissingInfoDialogComponent,
    WrongCredentialsDialogComponent,
    UserBasicInfoComponent,
    EditUserDialogComponent,
    FailedUpdateDialogComponent,
    SearchPageComponent,
    SettingsPageComponent,
    MyServicesPageComponent,
    StarRatingComponent,
    ReviewLateralListComponent,
    WeekdaySelectorComponent,
    CreateServiceDialogComponent,
    ScheduleServiceDialogComponent,
    RequestForProviderCardComponent,
    InstanceForProviderCardComponent,
    TimePickerComponent,
    RequestsForProviderListComponent,
    InstancesForProviderListComponent,
    ServicesForProviderListComponent,
    FullServiceCardComponent,
    EditServiceDialogComponent,
    RequestForClientComponent,
    RequestsForUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
