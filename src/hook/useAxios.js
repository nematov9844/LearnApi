import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const useAxios = () => {
	const response = ({ url, method = "GET", body, params, headers }) => {
		return axios({
			url: `${baseUrl}${url}`,
			method,
			data: body,
			params: { ...params },
			headers: { ...headers },
		}).then((res) => res.data);
	};

	return response;
};