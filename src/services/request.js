import { environment } from "../environments/environment";
import { globalState } from "./globalstate";

import { isUndefined } from "util";

const message = `Sorry, the request was unsuccessful. Please come back later.`;
export const requests = {
	getRequest: (endpoint, params, fullUrl) => {
		let paramsString = "";
		if (!isUndefined(params)) {
			paramsString += "?";
			for (let i = 0; i < Object.keys(params).length; i++) {
				const end = i < Object.keys(params).length - 1 ? "&" : "";
				paramsString +=
					Object.keys(params)[i] +
					"=" +
					encodeURIComponent(params[Object.keys(params)[i]]) +
					end;
			}
		}
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint + paramsString, {
				method: "GET",
				headers: {
					Authorization: "Bearer " + globalState.getBearerToken()
				}
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        //globalState.removeAllLocalStorage();
                        window.ced_token_expire = true;
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint + paramsString, {
				method: "GET",
				// headers: {
				// 	Authorization: "Bearer " + globalState.getBearerToken()
				// }
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        window.ced_token_expire = true;
                        //globalState.removeAllLocalStorage();
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
	postRequest: (endpoint, data, fullUrl) => {
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + globalState.getBearerToken()
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        window.ced_token_expire = true;
                        //globalState.removeAllLocalStorage();
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + globalState.getBearerToken()
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        window.ced_token_expire = true;
                        //globalState.removeAllLocalStorage();
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
	deleteRequest: (endpoint, data, fullUrl) => {
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + globalState.getBearerToken()
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        window.ced_token_expire = true;
                        //globalState.removeAllLocalStorage();
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + globalState.getBearerToken()
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        window.ced_token_expire = true;
                        //globalState.removeAllLocalStorage();
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
	putRequest: (endpoint, data, fullUrl) => {
		if (isUndefined(fullUrl) || !fullUrl) {
			return fetch(environment.API_ENDPOINT + endpoint, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + globalState.getBearerToken()
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        window.ced_token_expire = true;
                        //globalState.removeAllLocalStorage();
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		} else {
			return fetch(endpoint, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + globalState.getBearerToken()
				},
				body: JSON.stringify(data)
			})
				.then(res => {
					return res.json();
				})
                .then(e => {
                    if ( e.code === 'token_expired' || e.code === 'invalid_token' ||
                        e.code === 'future_token' ||
                        e.code === 'token_decode_error' ) {
                        window.ced_token_expire = true;
                        //globalState.removeAllLocalStorage();
                    }
                    return responseModifier(e);
                })
				.catch(e => {
					return { success: false, message: message, code: e };
				});
		}
	},
};

function responseModifier(res) {
	if ( !res['success'] || res['errorFlag'] !== undefined ) {
		res['success'] = false;
        if ( !res['message'] && res['msg'] ) {
        	res['message'] = res['msg'];
		}
    }
	return res;
}
