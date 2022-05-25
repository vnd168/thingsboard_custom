///
/// Copyright © 2016-2022 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Injectable } from '@angular/core';
import { defaultHttpOptionsFromConfig, RequestConfig } from './http-utils';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  AdminSettings,
  EntitiesVersionControlSettings,
  MailServerSettings,
  SecuritySettings,
  TestSmsRequest,
  UpdateMessage
} from '@shared/models/settings.models';
import { EntitiesVersionControlService } from '@core/http/entities-version-control.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    private entitiesVersionControlService: EntitiesVersionControlService
  ) { }

  public getAdminSettings<T>(key: string, config?: RequestConfig): Observable<AdminSettings<T>> {
    return this.http.get<AdminSettings<T>>(`/api/admin/settings/${key}`, defaultHttpOptionsFromConfig(config));
  }

  public saveAdminSettings<T>(adminSettings: AdminSettings<T>,
                              config?: RequestConfig): Observable<AdminSettings<T>> {
    return this.http.post<AdminSettings<T>>('/api/admin/settings', adminSettings, defaultHttpOptionsFromConfig(config));
  }

  public sendTestMail(adminSettings: AdminSettings<MailServerSettings>,
                      config?: RequestConfig): Observable<void> {
    return this.http.post<void>('/api/admin/settings/testMail', adminSettings, defaultHttpOptionsFromConfig(config));
  }

  public sendTestSms(testSmsRequest: TestSmsRequest,
                     config?: RequestConfig): Observable<void> {
    return this.http.post<void>('/api/admin/settings/testSms', testSmsRequest, defaultHttpOptionsFromConfig(config));
  }

  public getSecuritySettings(config?: RequestConfig): Observable<SecuritySettings> {
    return this.http.get<SecuritySettings>(`/api/admin/securitySettings`, defaultHttpOptionsFromConfig(config));
  }

  public saveSecuritySettings(securitySettings: SecuritySettings,
                              config?: RequestConfig): Observable<SecuritySettings> {
    return this.http.post<SecuritySettings>('/api/admin/securitySettings', securitySettings,
      defaultHttpOptionsFromConfig(config));
  }

  public getEntitiesVersionControlSettings(config?: RequestConfig): Observable<EntitiesVersionControlSettings> {
    return this.http.get<EntitiesVersionControlSettings>(`/api/admin/vcSettings`, defaultHttpOptionsFromConfig(config));
  }

  public saveEntitiesVersionControlSettings(versionControlSettings: EntitiesVersionControlSettings,
                                            config?: RequestConfig): Observable<EntitiesVersionControlSettings> {
    return this.http.post<EntitiesVersionControlSettings>('/api/admin/vcSettings', versionControlSettings,
      defaultHttpOptionsFromConfig(config)).pipe(
      tap(() => {
        this.entitiesVersionControlService.clearBranchList();
      })
    );
  }

  public deleteEntitiesVersionControlSettings(config?: RequestConfig) {
    return this.http.delete('/api/admin/vcSettings', defaultHttpOptionsFromConfig(config)).pipe(
      tap(() => {
        this.entitiesVersionControlService.clearBranchList();
      })
    );
  }

  public checkVersionControlAccess(versionControlSettings: EntitiesVersionControlSettings,
                                   config?: RequestConfig): Observable<void> {
    return this.http.post<void>('/api/admin/vcSettings/checkAccess', versionControlSettings, defaultHttpOptionsFromConfig(config));
  }

  public checkUpdates(config?: RequestConfig): Observable<UpdateMessage> {
    return this.http.get<UpdateMessage>(`/api/admin/updates`, defaultHttpOptionsFromConfig(config));
  }
}
