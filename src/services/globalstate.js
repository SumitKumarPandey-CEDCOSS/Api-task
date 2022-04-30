import { environment } from "../environments/environment";
import { isUndefined } from "util";

export const globalState = {
	setLocalStorage: (key, value) => {
		sessionStorage.setItem(key, value);
	},
	getLocalStorage: key => {
        return sessionStorage.getItem(key);
	},
	removeLocalStorage: key => {
		return sessionStorage.removeItem(key);
	},
	getBearerToken: () => {
		if (typeof sessionStorage.getItem("auth_token") !== "string") {
			return environment.Bearer;
		} else {
			return sessionStorage.getItem("auth_token");
		}
	},
	prepareQuery: params => {
		let queryString = Object.keys(params).length > 0 ? "?" : "";
		let end = "";
		for (let i = 0; i < Object.keys(params).length; i++) {
			let key = params[Object.keys(params)[i]];
			queryString += end + key + "=" + params[key];
			key = "&";
		}
		return queryString;
	},
	removeAllLocalStorage: () => {
        sessionStorage.clear();
	},
	log: (msg1, msg2, msg3) => {
		if (!environment.isLive) {
			if (!isUndefined(msg2) && !isUndefined(msg3)) {
				return console.log(msg1, msg2, msg3);
			} else if (!isUndefined(msg2)) {
				return console.log(msg1, msg2);
			} else {
				return console.log(msg1);
			}
		}
	}
};
