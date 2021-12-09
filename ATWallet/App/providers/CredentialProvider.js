import React, { createContext, useCallback, useContext, useReducer } from 'react';

import base64 from 'base-64';
import Config from 'react-native-config';
import * as Keychain from 'react-native-keychain';

const CredentialContext = createContext(undefined);

const sample = 'eyJhbGciOiJFUzI1NksiLCJraWQiOiJkaWQ6aW9uOkVpQnV3UU00WXUtcjNOVjJxUXNhZXUyemlaMDNENFRVVEtSQ0FaakRWVnRlSWc6ZXlKa1pXeDBZU0k2ZXlKd1lYUmphR1Z6SWpwYmV5SmhZM1JwYjI0aU9pSnlaWEJzWVdObElpd2laRzlqZFcxbGJuUWlPbnNpY0hWaWJHbGpTMlY1Y3lJNlczc2lhV1FpT2lKemFXZGZNMlpsWmprNFpEUWlMQ0p3ZFdKc2FXTkxaWGxLZDJzaU9uc2lZM0oySWpvaWMyVmpjREkxTm1zeElpd2lhM1I1SWpvaVJVTWlMQ0o0SWpvaVNqWkRlRUU1VTJRemVVVjRaMmhUVERKNk9VeDBZell6TVhaeGJFSmZSRlY2YkVvNFFsVTNXV1pPUlNJc0lua2lPaUp3V21oWVJHOUxiVk5OYzJGbGNuWTROM1YzTUU1ek9XWkxaa0ZFTjFoTFptWlFNakpyZVhCUFZYWk5JbjBzSW5CMWNuQnZjMlZ6SWpwYkltRjFkR2hsYm5ScFkyRjBhVzl1SWl3aVlYTnpaWEowYVc5dVRXVjBhRzlrSWwwc0luUjVjR1VpT2lKRlkyUnpZVk5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGtpZlYwc0luTmxjblpwWTJWeklqcGJleUpwWkNJNklteHBibXRsWkdSdmJXRnBibk1pTENKelpYSjJhV05sUlc1a2NHOXBiblFpT25zaWIzSnBaMmx1Y3lJNld5Sm9kSFJ3Y3pvdkwzQmxjbVI0TG1sdkx5SmRmU3dpZEhsd1pTSTZJa3hwYm10bFpFUnZiV0ZwYm5NaWZWMTlmVjBzSW5Wd1pHRjBaVU52YlcxcGRHMWxiblFpT2lKRmFVSkplVEZUVFhoeldqUndMUzF1TmtJMU1WUlhRakZEWldsNGJEWnFhM1Y2UVZOVVptYzJRV0Y0YkZkQkluMHNJbk4xWm1acGVFUmhkR0VpT25zaVpHVnNkR0ZJWVhOb0lqb2lSV2xFY2psVWJWbGhTVEV3YW1FdE1GcHpXa0o1T0RKdVdtY3lUMkYxTUdwU2JVRldTSEUzWjA5cmVuQlJRU0lzSW5KbFkyOTJaWEo1UTI5dGJXbDBiV1Z1ZENJNklrVnBRbEpsZFRZNVJYTjBVVlJMZURWQ1YxVmZVemh5TkRSb1h6WnBZMjB0VmxFeVdYWlROVTU0Tmt3dFYzY2lmWDAjc2lnXzNmZWY5OGQ0IiwidHlwIjoiSldUIn0.eyJyZXNwb25zZV90eXBlIjoiaWRfdG9rZW4iLCJyZXNwb25zZV9tb2RlIjoiZm9ybV9wb3N0IiwiY2xpZW50X2lkIjoiaHR0cHM6Ly9iZXRhLmRpZC5tc2lkZW50aXR5LmNvbS92MS4wLzkxMjUyNjRjLTg2Y2ItNDVmZS1iYWEyLWUwMjJkYjA1OTBkNi92ZXJpZmlhYmxlY3JlZGVudGlhbHMvaXNzdWFuY2UiLCJzY29wZSI6Im9wZW5pZCBkaWRfYXV0aG4iLCJub25jZSI6ImthZVI3RDdmMzB5SVhvTjRmQ29TOGc9PSIsInJlZ2lzdHJhdGlvbiI6eyJjbGllbnRfbmFtZSI6IlZlcmlmaWFibGUgQ3JlZGVudGlhbCBFeHBlcnQgU2FtcGxlIiwiY2xpZW50X3B1cnBvc2UiOiIiLCJzdWJqZWN0X2lkX3R5cGVzX3N1cHBvcnRlZCI6WyJkaWQiXSwiY3JlZGVudGlhbF9mb3JtYXRfc3VwcG9ydGVkIjpbImp3dCJdfSwicHJlc2VudGF0aW9uX2RlZmluaXRpb24iOnsiaW5wdXRfZGVzY3JpcHRvcnMiOlt7ImlkIjoiQVRJZGVudGl0eSIsInNjaGVtYSI6eyJ1cmkiOlsiQVRJZGVudGl0eSJdfSwiaXNzdWFuY2UiOlt7Im1hbmlmZXN0IjoiaHR0cHM6Ly9iZXRhLmRpZC5tc2lkZW50aXR5LmNvbS92MS4wLzkxMjUyNjRjLTg2Y2ItNDVmZS1iYWEyLWUwMjJkYjA1OTBkNi92ZXJpZmlhYmxlQ3JlZGVudGlhbC9jb250cmFjdHMvQVRJZGVudGl0eSJ9XX1dfSwicHJvbXB0IjoiY3JlYXRlIiwiaXNzIjoiZGlkOmlvbjpFaUJ1d1FNNFl1LXIzTlYycVFzYWV1MnppWjAzRDRUVVRLUkNBWmpEVlZ0ZUlnOmV5SmtaV3gwWVNJNmV5SndZWFJqYUdWeklqcGJleUpoWTNScGIyNGlPaUp5WlhCc1lXTmxJaXdpWkc5amRXMWxiblFpT25zaWNIVmliR2xqUzJWNWN5STZXM3NpYVdRaU9pSnphV2RmTTJabFpqazRaRFFpTENKd2RXSnNhV05MWlhsS2Qyc2lPbnNpWTNKMklqb2ljMlZqY0RJMU5tc3hJaXdpYTNSNUlqb2lSVU1pTENKNElqb2lTalpEZUVFNVUyUXplVVY0WjJoVFRESjZPVXgwWXpZek1YWnhiRUpmUkZWNmJFbzRRbFUzV1daT1JTSXNJbmtpT2lKd1dtaFlSRzlMYlZOTmMyRmxjblk0TjNWM01FNXpPV1pMWmtGRU4xaExabVpRTWpKcmVYQlBWWFpOSW4wc0luQjFjbkJ2YzJWeklqcGJJbUYxZEdobGJuUnBZMkYwYVc5dUlpd2lZWE56WlhKMGFXOXVUV1YwYUc5a0lsMHNJblI1Y0dVaU9pSkZZMlJ6WVZObFkzQXlOVFpyTVZabGNtbG1hV05oZEdsdmJrdGxlVEl3TVRraWZWMHNJbk5sY25acFkyVnpJanBiZXlKcFpDSTZJbXhwYm10bFpHUnZiV0ZwYm5NaUxDSnpaWEoyYVdObFJXNWtjRzlwYm5RaU9uc2liM0pwWjJsdWN5STZXeUpvZEhSd2N6b3ZMM0JsY21SNExtbHZMeUpkZlN3aWRIbHdaU0k2SWt4cGJtdGxaRVJ2YldGcGJuTWlmVjE5ZlYwc0luVndaR0YwWlVOdmJXMXBkRzFsYm5RaU9pSkZhVUpKZVRGVFRYaHpXalJ3TFMxdU5rSTFNVlJYUWpGRFpXbDRiRFpxYTNWNlFWTlVabWMyUVdGNGJGZEJJbjBzSW5OMVptWnBlRVJoZEdFaU9uc2laR1ZzZEdGSVlYTm9Jam9pUldsRWNqbFViVmxoU1RFd2FtRXRNRnB6V2tKNU9ESnVXbWN5VDJGMU1HcFNiVUZXU0hFM1owOXJlbkJSUVNJc0luSmxZMjkyWlhKNVEyOXRiV2wwYldWdWRDSTZJa1ZwUWxKbGRUWTVSWE4wVVZSTGVEVkNWMVZmVXpoeU5EUm9YelpwWTIwdFZsRXlXWFpUTlU1NE5rd3RWM2NpZlgwIiwiaWF0IjoxNjM4ODQ3Mzk1LCJqdGkiOiJiNTE2YjRkNS0xNmY5LTQ0M2YtYTUxMS0zZTAxMDY5ODA4NzYiLCJleHAiOjE2Mzg4NDc2OTUsInN0YXRlIjoiZGpHT2NVektmcWEvZHJzMU91Zk5CYXkyM0V5aUhqZ21qMG1CMDEzN3RGdFZDalArdWV5MFZFQlMvMFJkQUtQMmRQcUx5WGVlOVJSTWI5dWNCMVc1THpxSmNoS3Vuayt6KzdXb3Z1RmpDVWwweW9tOHM0MVU3NTVoMkFXMitVZmdZaTI1bHRwblk4SnBCQ3ErYklHMTdzK2lDUTZMekJ3amg0aWdjUisrSld0STFoYkt2eEVJbXJ4MXFNcldLcVZWaFBkOXZGSTlXQUdHaVVpamFoZjBSbHBHbFpQcHhzUVJjYUZNV3BlV0pWNzhkTjllUzVCSHlyZ1FMMUFaaDdkS2NvQ2t6bHRnMnRMbVF4dE1sMTdjK2pWS29GNDAyOU1YNldueTE0THp2VzFybzEyNG5oTVlUbjYrVERUOUxvZEFpa1dzZW5NejBYc1gxTk5QNExxd2EyOVU5cVBCbEFHS09KS0dXK2VXSE9kYlYvMi9PbTBCU0Z1L2xPdCtDLytTaU93Y2hyOGQ1Y2UxTGlJVGpCNjZaLzNQY2RxdUtsQzUzQlF4am9UcWpvREdvZGY1TlBWT1hGNjlQR3Z0cEhqRmxCUEs2QmtWZUxndUFLYTQrTlU5UUZPa1JUSE5hTm81Zis4dE5FaytqdGVPbnRjNDFzRlMvVUtUdnRBK2Y3RkhJa1AwalhRR29xTzZpUjBzTWJ0cWRvdEQ5Y0ZnWmFQcTRySW9VNVp1aXBaRzBrUjNDTjVXVytaZVkydUZPMS9Zekl3OVhJMGRnY25NRUpLODNsNEVkbUFtSWE3R3h2djlCb05TcUZENjJ2TXp2V0dPUURwbUlueDlEdXdRdHJwVm9VWGNrS2V5NjJ1bG5IQ0cwTkRpWGpTL0FjanNmZXFlMy95MXdkQjZSNmhwYXJxdERtUmFNSXN2K1JvRkE5bzBUWUhHU0JaZWtrSURNTDZibzlwVVdVTDgyT0ZpU1hGS1ZnZGlabHA0QUExVFVMYjJEaWowVWpRUHA1dU1xSkgzMnBQbEtuZFZiSEllVlp4ck1OeHA4NFJvV2JNSXNaQTZubHVFV25mZ25yaXR0MVFkT3NSVmE3ZEc5Y3g0c1kzZXk1VSsvNm9wamk5akljYXJWc1hNNWdpa3RTeXNXalFBU3p5azhLV2twS2lzTmJkbmJwcFVkTWxJNjJzdmNOSU5Ibk03c3NxeHQ0KzMyNk10NnpZK3pGWkFOVHRtNGlidUNIL29pem9hVkx0TTRqQVhNM3RReUxoWEtJamQycGUrc1N2TTlBMU5XbHdjK1FFZnZLTGI5dWd5aUtHanZRN0h0MDQ2UlR5c3dCdzVXZWNick1ORzl1WjE1Z2FhSlFLR21XVVFvOEo5ZXZETGMzdTJxZDVSR1NLK1oxWmxoNU96S0MybmE3NDhWMkFIUGJiMFZJeUlLd1J2ek1NV1U1c21BMm43Sm5HTDNPdFZVQTgvVVJPUitjWlhDRjdaY3hUWmFJZ2F6OHRlYmxUUEdUZkxqNEZUWmFkNFA4NmtVaVhmNFByK2h0bGNxYVF0Vjlmbk1kczZPMThUQVdValI0R1FPWk91MFkvd1JMWVNzSElsWkFiaXNvQjlGSVUxWXJwbU8rZWRjZGNCY2w1b3l1aUxtaGwxUDFRenZQdXhWMFhhUHdja2dUVEE3a1VVa2g2eG0vWXRwUHkzM1ZESVQ1eUc5VC9xaUpkOGNVWnE1Znd0U1kyRHZoMDc2aDZpUm9DdTQ1UW94bWNGeUREcVhIRmpZNGY5NTg4dXlHaS95VnArVTIvR0ZpMmhCMU54TEFORmw4YzJ2OEhPNkFOYzRna2Qwd21BbDlMbEdIRllWeUhpUXVpdHB1Sk80K3h4NGo1ZlJrZ09ScHVYbk1XeHZhSlpMOHpxeTYxOTdNbTJHbzd4Q0lWNk5la045dFY4WFMxb2tLanRhd3h0WTFpamZQVE5hWTZ1YVFVM0tCVzhKWDYyd29XVXV5NUFubk14aWM4aUI2S1V2b0FranVMS1pIS2Q5K0YrNXpNUWg3VnpuU0hnQU5ERGJUdzJMOXFyU2dSQ3ZFcVUycE1LYVRESUZzUUZWT2pacGlVRXpVcWtTenZteU5zRHAyUjJCYVpHMnBodkNRNHNNOVIwYkI5N0xmTlIwc2hhYUE9PSIsInBpbiI6eyJsZW5ndGgiOjQsInR5cGUiOiJudW1lcmljIiwiaGFzaCI6IlA5T2JGU2tnSkR4R2JpR0pHZ3o2Wm9WdGprRmhZa3dXMUVyR0lzMHpla2c9In0sImlkX3Rva2VuX2hpbnQiOiJleUpoYkdjaU9pSkZVekkxTmtzaUxDSnJhV1FpT2lKa2FXUTZhVzl1T2tWcFFuVjNVVTAwV1hVdGNqTk9Wakp4VVhOaFpYVXllbWxhTURORU5GUlZWRXRTUTBGYWFrUldWblJsU1djNlpYbEthMXBYZURCWlUwazJaWGxLZDFsWVVtcGhSMVo2U1dwd1ltVjVTbWhaTTFKd1lqSTBhVTlwU25sYVdFSnpXVmRPYkVscGQybGFSemxxWkZjeGJHSnVVV2xQYm5OcFkwaFdhV0pIYkdwVE1sWTFZM2xKTmxjemMybGhWMUZwVDJsS2VtRlhaR1pOTWxwc1dtcHJORnBFVVdsTVEwcDNaRmRLYzJGWFRreGFXR3hMWkRKemFVOXVjMmxaTTBveVNXcHZhV015Vm1walJFa3hUbTF6ZUVscGQybGhNMUkxU1dwdmFWSlZUV2xNUTBvMFNXcHZhVk5xV2tSbFJVVTFWVEpSZW1WVlZqUmFNbWhVVkVSS05rOVZlREJaZWxsNlRWaGFlR0pGU21aU1JsWTJZa1Z2TkZGc1ZUTlhWMXBQVWxOSmMwbHVhMmxQYVVwM1YyMW9XVkpIT1V4aVZrNU9ZekpHYkdOdVdUUk9NMVl6VFVVMWVrOVhXa3hhYTBaRlRqRm9URnB0V2xGTmFrcHlaVmhDVUZaWVdrNUpiakJ6U1c1Q01XTnVRblpqTWxaNlNXcHdZa2x0UmpGa1IyaHNZbTVTY0ZreVJqQmhWemwxU1dsM2FWbFlUbnBhV0Vvd1lWYzVkVlJYVmpCaFJ6bHJTV3d3YzBsdVVqVmpSMVZwVDJsS1Jsa3lVbnBaVms1c1dUTkJlVTVVV25KTlZscHNZMjFzYldGWFRtaGtSMngyWW10MGJHVlVTWGROVkd0cFpsWXdjMGx1VG14amJscHdXVEpXZWtscWNHSmxlVXB3V2tOSk5rbHRlSEJpYlhSc1drZFNkbUpYUm5CaWJrMXBURU5LZWxwWVNqSmhWMDVzVWxjMWEyTkhPWEJpYmxGcFQyNXphV0l6U25CYU1teDFZM2xKTmxkNVNtOWtTRkozWTNwdmRrd3pRbXhqYlZJMFRHMXNka3g1U21SbVUzZHBaRWhzZDFwVFNUWkphM2h3WW0xMGJGcEZVblppVjBad1ltNU5hV1pXTVRsbVZqQnpTVzVXZDFwSFJqQmFWVTUyWWxjeGNHUkhNV3hpYmxGcFQybEtSbUZWU2twbFZFWlVWRmhvZWxkcVVuZE1VekYxVG10Sk1VMVdVbGhSYWtaRVdsZHNOR0pFV25GaE0xWTJVVlpPVlZwdFl6SlJWMFkwWWtaa1FrbHVNSE5KYms0eFdtMWFjR1ZGVW1oa1IwVnBUMjV6YVZwSFZuTmtSMFpKV1ZoT2IwbHFiMmxTVjJ4RlkycHNWV0pXYkdoVFZFVjNZVzFGZEUxR2NIcFhhMG8xVDBSS2RWZHRZM2xVTWtZeFRVZHdVMkpWUmxkVFNFVXpXakE1Y21WdVFsSlJVMGx6U1c1S2JGa3lPVEphV0VvMVVUSTVkR0pYYkRCaVYxWjFaRU5KTmtsclZuQlJiRXBzWkZSWk5WSllUakJWVmxKTVpVUldRMVl4Vm1aVmVtaDVUa1JTYjFoNlduQlpNakIwVm14RmVWZFlXbFJPVlRVMFRtdDNkRll6WTJsbVdEQWpjMmxuWHpObVpXWTVPR1EwSWl3aWRIbHdJam9pU2xkVUluMC5leUpoZFdRaU9pSm9kSFJ3Y3pvdkwySmxkR0V1Wkdsa0xtMXphV1JsYm5ScGRIa3VZMjl0TDNZeExqQXZPVEV5TlRJMk5HTXRPRFpqWWkwME5XWmxMV0poWVRJdFpUQXlNbVJpTURVNU1HUTJMM1psY21sbWFXRmliR1ZEY21Wa1pXNTBhV0ZzTDJOaGNtUXZhWE56ZFdVaUxDSmthV1FpT2lKa2FXUTZhVzl1T2tWcFFuVjNVVTAwV1hVdGNqTk9Wakp4VVhOaFpYVXllbWxhTURORU5GUlZWRXRTUTBGYWFrUldWblJsU1djNlpYbEthMXBYZURCWlUwazJaWGxLZDFsWVVtcGhSMVo2U1dwd1ltVjVTbWhaTTFKd1lqSTBhVTlwU25sYVdFSnpXVmRPYkVscGQybGFSemxxWkZjeGJHSnVVV2xQYm5OcFkwaFdhV0pIYkdwVE1sWTFZM2xKTmxjemMybGhWMUZwVDJsS2VtRlhaR1pOTWxwc1dtcHJORnBFVVdsTVEwcDNaRmRLYzJGWFRreGFXR3hMWkRKemFVOXVjMmxaTTBveVNXcHZhV015Vm1walJFa3hUbTF6ZUVscGQybGhNMUkxU1dwdmFWSlZUV2xNUTBvMFNXcHZhVk5xV2tSbFJVVTFWVEpSZW1WVlZqUmFNbWhVVkVSS05rOVZlREJaZWxsNlRWaGFlR0pGU21aU1JsWTJZa1Z2TkZGc1ZUTlhWMXBQVWxOSmMwbHVhMmxQYVVwM1YyMW9XVkpIT1V4aVZrNU9ZekpHYkdOdVdUUk9NMVl6VFVVMWVrOVhXa3hhYTBaRlRqRm9URnB0V2xGTmFrcHlaVmhDVUZaWVdrNUpiakJ6U1c1Q01XTnVRblpqTWxaNlNXcHdZa2x0UmpGa1IyaHNZbTVTY0ZreVJqQmhWemwxU1dsM2FWbFlUbnBhV0Vvd1lWYzVkVlJYVmpCaFJ6bHJTV3d3YzBsdVVqVmpSMVZwVDJsS1Jsa3lVbnBaVms1c1dUTkJlVTVVV25KTlZscHNZMjFzYldGWFRtaGtSMngyWW10MGJHVlVTWGROVkd0cFpsWXdjMGx1VG14amJscHdXVEpXZWtscWNHSmxlVXB3V2tOSk5rbHRlSEJpYlhSc1drZFNkbUpYUm5CaWJrMXBURU5LZWxwWVNqSmhWMDVzVWxjMWEyTkhPWEJpYmxGcFQyNXphV0l6U25CYU1teDFZM2xKTmxkNVNtOWtTRkozWTNwdmRrd3pRbXhqYlZJMFRHMXNka3g1U21SbVUzZHBaRWhzZDFwVFNUWkphM2h3WW0xMGJGcEZVblppVjBad1ltNU5hV1pXTVRsbVZqQnpTVzVXZDFwSFJqQmFWVTUyWWxjeGNHUkhNV3hpYmxGcFQybEtSbUZWU2twbFZFWlVWRmhvZWxkcVVuZE1VekYxVG10Sk1VMVdVbGhSYWtaRVdsZHNOR0pFV25GaE0xWTJVVlpPVlZwdFl6SlJWMFkwWWtaa1FrbHVNSE5KYms0eFdtMWFjR1ZGVW1oa1IwVnBUMjV6YVZwSFZuTmtSMFpKV1ZoT2IwbHFiMmxTVjJ4RlkycHNWV0pXYkdoVFZFVjNZVzFGZEUxR2NIcFhhMG8xVDBSS2RWZHRZM2xVTWtZeFRVZHdVMkpWUmxkVFNFVXpXakE1Y21WdVFsSlJVMGx6U1c1S2JGa3lPVEphV0VvMVVUSTVkR0pYYkRCaVYxWjFaRU5KTmtsclZuQlJiRXBzWkZSWk5WSllUakJWVmxKTVpVUldRMVl4Vm1aVmVtaDVUa1JTYjFoNlduQlpNakIwVm14RmVWZFlXbFJPVlRVMFRtdDNkRll6WTJsbVdEQWlMQ0p1YjI1alpTSTZJa2RtUjIwNFNEWllUVEpqTmxwTllteGtRbFJRUTFFOVBTSXNJbk4xWWlJNklrdENlR1p6TVdRd2JHczVMV2hpZVU1WmVVbE9iSFpEV0VoaFQyOWlRME5PYW1kNFRXTjFZVGxUWTJNaUxDSnpkV0pmYW5kcklqcDdJbU55ZGlJNkluTmxZM0F5TlRack1TSXNJbXRwWkNJNkltUnBaRHBwYjI0NlJXbENkWGRSVFRSWmRTMXlNMDVXTW5GUmMyRmxkVEo2YVZvd00wUTBWRlZVUzFKRFFWcHFSRlpXZEdWSlp6cGxlVXByV2xkNE1GbFRTVFpsZVVwM1dWaFNhbUZIVm5wSmFuQmlaWGxLYUZrelVuQmlNalJwVDJsS2VWcFlRbk5aVjA1c1NXbDNhVnBIT1dwa1Z6RnNZbTVSYVU5dWMybGpTRlpwWWtkc2FsTXlWalZqZVVrMlZ6TnphV0ZYVVdsUGFVcDZZVmRrWmsweVdteGFhbXMwV2tSUmFVeERTbmRrVjBwellWZE9URnBZYkV0a01uTnBUMjV6YVZrelNqSkphbTlwWXpKV2FtTkVTVEZPYlhONFNXbDNhV0V6VWpWSmFtOXBVbFZOYVV4RFNqUkphbTlwVTJwYVJHVkZSVFZWTWxGNlpWVldORm95YUZSVVJFbzJUMVY0TUZsNldYcE5XRnA0WWtWS1psSkdWalppUlc4MFVXeFZNMWRYV2s5U1UwbHpTVzVyYVU5cFNuZFhiV2haVWtjNVRHSldUazVqTWtac1kyNVpORTR6VmpOTlJUVjZUMWRhVEZwclJrVk9NV2hNV20xYVVVMXFTbkpsV0VKUVZsaGFUa2x1TUhOSmJrSXhZMjVDZG1NeVZucEphbkJpU1cxR01XUkhhR3hpYmxKd1dUSkdNR0ZYT1hWSmFYZHBXVmhPZWxwWVNqQmhWemwxVkZkV01HRkhPV3RKYkRCelNXNVNOV05IVldsUGFVcEdXVEpTZWxsV1RteFpNMEY1VGxSYWNrMVdXbXhqYld4dFlWZE9hR1JIYkhaaWEzUnNaVlJKZDAxVWEybG1WakJ6U1c1T2JHTnVXbkJaTWxaNlNXcHdZbVY1U25CYVEwazJTVzE0Y0dKdGRHeGFSMUoyWWxkR2NHSnVUV2xNUTBwNldsaEtNbUZYVG14U1Z6VnJZMGM1Y0dKdVVXbFBibk5wWWpOS2NGb3liSFZqZVVrMlYzbEtiMlJJVW5kamVtOTJURE5DYkdOdFVqUk1iV3gyVEhsS1pHWlRkMmxrU0d4M1dsTkpOa2xyZUhCaWJYUnNXa1ZTZG1KWFJuQmliazFwWmxZeE9XWldNSE5KYmxaM1drZEdNRnBWVG5aaVZ6RndaRWN4YkdKdVVXbFBhVXBHWVZWS1NtVlVSbFJVV0doNlYycFNkMHhUTVhWT2Ewa3hUVlpTV0ZGcVJrUmFWMncwWWtSYWNXRXpWalpSVms1VldtMWpNbEZYUmpSaVJtUkNTVzR3YzBsdVRqRmFiVnB3WlVWU2FHUkhSV2xQYm5OcFdrZFdjMlJIUmtsWldFNXZTV3B2YVZKWGJFVmphbXhWWWxac2FGTlVSWGRoYlVWMFRVWndlbGRyU2pWUFJFcDFWMjFqZVZReVJqRk5SM0JUWWxWR1YxTklSVE5hTURseVpXNUNVbEZUU1hOSmJrcHNXVEk1TWxwWVNqVlJNamwwWWxkc01HSlhWblZrUTBrMlNXdFdjRkZzU214a1ZGazFVbGhPTUZWV1VreGxSRlpEVmpGV1psVjZhSGxPUkZKdldIcGFjRmt5TUhSV2JFVjVWMWhhVkU1Vk5UUk9hM2QwVmpOamFXWllNQ056YVdkZk0yWmxaams0WkRRaUxDSnJkSGtpT2lKRlF5SXNJbmdpT2lKS05rTjRRVGxUWkRONVJYaG5hRk5NTW5vNVRIUmpOak14ZG5Gc1FsOUVWWHBzU2poQ1ZUZFpaazVGSWl3aWVTSTZJbkJhYUZoRWIwdHRVMDF6WVdWeWRqZzNkWGN3VG5NNVprdG1RVVEzV0V0bVpsQXlNbXQ1Y0U5VmRrMGlmU3dpWjJsMlpXNWZibUZ0WlNJNklrRnVaSEpsZHlJc0ltWmhiV2xzZVY5dVlXMWxJam9pVjJWemRHOXVJaXdpWW1seWRHaGZaR0YwWlNJNklqQTJMekF5THpFNU5qTWlMQ0p6WlhnaU9pSk5ZV3hsSWl3aVpXMWhhV3dpT2lKaGJtUnlaWGN1ZDJWemRHOXVRSEJ5YjNCbGJHeGxjbWhsWVdRdVkyOHVibm9pTENKdGIySnBiR1VpT2lJd01qRTJOemN5TXpnaUxDSmphWFI1SWpvaVFYVmphMnhoYm1RaUxDSmpiM1Z1ZEhKNUlqb2lUbVYzSUZwbFlXeGhibVFpTENKa2NtbDJaWEp6WDJ4cFkyVnVjMlVpT2lKRVNqQXdPVFUwTXpnaUxDSnBjM01pT2lKb2RIUndjem92TDNObGJHWXRhWE56ZFdWa0xtMWxJaXdpYVdGMElqb3hOak00T0RRM016azJMQ0pxZEdraU9pSmlOVEUyWWpSa05TMHhObVk1TFRRME0yWXRZVFV4TVMwelpUQXhNRFk1T0RBNE56WWlMQ0psZUhBaU9qRTJNemc0TkRjMk9UWXNJbkJwYmlJNmV5SnNaVzVuZEdnaU9qUXNJblI1Y0dVaU9pSnVkVzFsY21saklpd2lhR0Z6YUNJNklsQTVUMkpHVTJ0blNrUjRSMkpwUjBwSFozbzJXbTlXZEdwclJtaFphM2RYTVVWeVIwbHpNSHBsYTJjOUluMTkuMTNWa1ZkUGpSSVBTTE1EdHFIU0l5RE1rTU5mUEVTUU9iV2RyMFhnYUxnNHExSUYtQ0QyRm1JYnJQdi0tTlBZcHdkRm5tVkpaUUlubFVBcmpzVlB3OEEifQ.1LV7GWbF6lGExNnOS4vkoEOYQXsVFj1VNJ8OHNTS6pv9VQJyLZkaUDzL2igHiI0UXuSjvhzPECHywCoaierrLw';

const getStoredCreds = async () => {
    const kcEntry = await Keychain.getGenericPassword({ service: 'credentials' });
    let credentials = [];
    if (kcEntry) {
        credentials = JSON.parse(kcEntry.password);
    }
    return credentials;
};

const storeCreds = async (credentials) => {
    const c = JSON.stringify(credentials);
    const description = 'verifiable credentials';
    await Keychain.setGenericPassword(description, c, { service: 'credentials' });
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                loading: true,
                message: '',
                error: null,
            };
        }
        case 'loaded': {
            return {
                ...state,
                startup: false,
                credentials: action.payload.credentials,
                loading: false,
                error: null,
            };
        }
        case 'issuanceRequested': {
            return {
                ...state,
                issuance: action.payload,
                issuanceStatus: 'requested',
            };
        }
        case 'issuanceStateChecked': {
            return {
                ...state,
                issuanceStatus: action.payload.status,
            };
        }
        case 'issuanceFailed': {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                issuance: null,
                issuanceStatus: null,
            };
        }
        case 'vcReceived': {
            const { credential } = action.payload;
            const credentials = JSON.parse(JSON.stringify(state.credentials));
            credentials.push(credential);
            return {
                ...state,
                credentials,
                loading: false,
                error: null,
                issuance: null,
                issuanceStatus: null,
            };
        }
        case 'error': {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        default:
            throw new Error(`Unsupported action type dispatched to CredentialProvider reducer: ${action.type}`);
    }
};

export const useCredentials = () => {
    const context = useContext(CredentialContext);
    if (!context) {
        throw new Error('useCredentials must be used within a CredentialProvider');
    }
    const { state, dispatch } = context;

    // Retrieve credential list from local keychain storage.
    const load = async () => {
        dispatch({ type: 'init' });
        const credentials = await getStoredCreds();
        dispatch({ type: 'loaded', payload: { credentials } });
    };

    // Invoke issuance of a pending VC.
    // TODO: Add onboarding 'id' and 'password' to request so the issuer can check before issuing.
    const issuance = async () => {
        dispatch({ type: 'init' });

        const uri = Config.API_HOST + '/issuer/issuance';
        try {
            const res = await fetch(uri, { method: 'GET' });
            if (res.status !== 200) {
                console.error('HTTP Status: ' + res.status);
                dispatch({ type: 'error', payload: { error: 'API response status not OK' } });
                return;
            }
            const resData = await res.json();
            console.log(resData);
            dispatch({ type: 'issuanceRequested', payload: { ...resData } });
        } catch (e) {
            console.error(e);
            dispatch({ type: 'error', payload: { error: 'Exception in issuance API call' } });
        }
    };

    const issuanceState = useCallback(async () => {
        if (!state.issuance) {
            return;
        }

        dispatch({ type: 'init' }); // TODO: Is this needed?
        const uri = `${Config.API_HOST}/issuer/status/${state.issuance.state}`;
        console.log(uri);
        try {
            const res = await fetch(uri, { method: 'GET' });
            if (res.status !== 200) {
                console.error('HTTP Status: ' + res.status);
                dispatch({ type: 'issuanceFailed', payload: { error: 'API response status not OK' } });
                return;
            }
            const resData = await res.json();
            console.log(resData);
            if (resData.status === 'issuance_error') {
                console.log(resData.message);
                dispatch({ type: 'issuanceFailed', payload: { error: resData.message } });
            } else {
                dispatch({ type: 'issuanceStateChecked', payload: { ...resData } });
            }
        } catch (e) {
            console.error(e);
            dispatch({ type: 'issuanceFailed', payload: { error: 'Exception in issuance status check API call' } });
        }
    }, [state.issuance, dispatch]);

    const getVC = useCallback(async (vcuri) => {
        dispatch({ type: 'init' });
        const uri = vcuri.split('request_uri=').pop();
        try {
            const res = await fetch(uri, { method: 'GET' });
            if (res.status !== 200) {
                // Can't recover from this. Need to clear issuance from state to enable user to
                // try again. (This can happen if we don't claim the VC fast enough and the
                // issuance expires, for example).
                console.error('HTTP Status: ' + res.status);
                const errorInfo = await res.json();
                console.log(errorInfo);
                dispatch({ type: 'issuanceFailed', payload: { error: 'API response status not OK' } });
                return;
            }
            // Response body should be a JWT as a string
            const jwt = await res.text();
            console.log(jwt);

            // TODO: decode

            dispatch({ type: 'vcReceived', payload: { credential: '' } });

            // TODO: update keychain storage
        } catch (e) {
            console.error(e);
            dispatch({ type: 'issuanceFailed', payload: { error: 'Exception in fetching VC' } });
        }
    }, [dispatch]);

    // Claim credential from issuer
    // const claim = async () => {
    //     dispatch({ type: 'init' });

    //     // Call issuer/issuance and get the URL for the VC


    //     // Call VC URL and get OpenID token


    //     // Decode token into VC


    //     // Add the VC to local storage
    //     const storedCreds = await getStoredCreds();
    //     storedCreds.push(credential);
    //     await storeCreds(storedCreds);

    //     // Add the VC to current state

    // };

    return { state, getVC, issuance, issuanceState, load };
};

const CredentialProvider = (props) => {
    const initalState = {
        startup: true,
        credentials: [],
        loading: false,
        message: '',
        error: null,
        issuance: null,
        issuanceStatus: null,
    };

    const [state, dispatch] = useReducer(reducer, initalState);

    return (
        <CredentialContext.Provider value={{ state, dispatch }}>
            {props.children}
        </CredentialContext.Provider>
    );
};

export default CredentialProvider;
