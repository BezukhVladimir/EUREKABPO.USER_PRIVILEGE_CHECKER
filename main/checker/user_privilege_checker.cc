#include <napi.h>
#include <windows.h>
#include <lm.h>
#include <string>

#pragma comment(lib, "netapi32.lib")

std::wstring GetUsername(const Napi::CallbackInfo &info);
int GetUserPrivilege(const std::wstring& username);

Napi::Number Check(const Napi::CallbackInfo& info) {
    std::wstring username = GetUsername(info);

    // https://learn.microsoft.com/ru-ru/windows/win32/api/lmaccess/ns-lmaccess-user_info_1
    /*
        USER_PRIV_GUEST = 0,
        USER_PRIV_USER  = 1,
        USER_PRIV_ADMIN = 2
    */
    int userPrivilege = GetUserPrivilege(username);

    return Napi::Number::New(info.Env(), userPrivilege);
}

std::wstring GetUsername(const Napi::CallbackInfo &info) {
    std::u16string u16Temp = info[0].As<Napi::String>().Utf16Value();
    return std::wstring(u16Temp.begin(), u16Temp.end());
}

int GetUserPrivilege(const std::wstring& username) {
    int userPrivilege = -1;

    // https://learn.microsoft.com/ru-ru/windows/win32/api/lmaccess/nf-lmaccess-netusergetinfo
    DWORD level = 1;
    LPBYTE bufptr = NULL;
    NET_API_STATUS netApiStatus = NetUserGetInfo(NULL, username.c_str(), level, &bufptr);

    if (netApiStatus == NERR_Success) {
        if (bufptr != NULL) {
            USER_INFO_1 *userInfo = reinterpret_cast<USER_INFO_1*>(bufptr);
            userPrivilege = userInfo->usri1_priv;
        } else {
            fprintf(stderr, "bufptr is NULL\n");
        }
    } else {
        fprintf(stderr, "NetUserGetInfo failed with error: %d\n", netApiStatus);
    }

    if (bufptr != NULL) {
        NetApiBufferFree(bufptr);
    }

    return userPrivilege;
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "check"), Napi::Function::New(env, Check));
    return exports;
}

NODE_API_MODULE(user_privilege_checker, Init)
