import axios from "axios";
import { encryption } from "@/utils/crypto";

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_API });
const API1 = axios.create({ baseURL: process.env.NEXT_PUBLIC_API });

if (typeof window !== "undefined") {
  const authToken = localStorage.getItem("AUTH_TOKEN");
  API.interceptors.request.use((req) => {
    req.withCredentials = true;
    if (authToken) {
      req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req;
  });

  API1.interceptors.request.use((req) => {
    req.withCredentials = true;
    if (authToken) {
      req.headers.Authorization = `Bearer ${authToken}`;
    }
    req.headers.contentType = "multipart/form-data";
    return req;
  });
}

export const call = (callback) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await callback;
      if (data.success) {
        delete data.success;
        resolve(data);
      } else {
        delete data.success;
        reject(data);
      }
    } catch (err) {
      // if (err?.response?.status === 401) {
      //   typeof window !== "undefined" &&
      //     localStorage.setItem("isLoggedin", false);
      // }
      reject(
        err.response?.data?.errors ||
          err.response?.data?.message ||
          "Something went wrong"
      );
    }
  });
};

// Authentication

export const login = (data) =>
  API.post("/auth/login", { data: encryption(data) });
export const forgot = (data) => API.post("/auth/forgot-password", data);
export const changePass = (data) =>
  API.post("/auth/change-password", { data: encryption(data) });
export const resetPass = (data) =>
  API.post("/auth/reset-password", { data: encryption(data) });
export const forgotVerify = (data) => API.post("/auth/forgot-verify", data);
export const socialLogin = (data) =>
  API.post("/auth/social-login", { data: encryption(data) });
export const register = (data) =>
  API.post("/auth/register", { data: encryption(data) });
export const accountVerify = (data) => API.post("/auth/account-verify", data);
export const updateProfile = (data) => API.put("/auth/profile", data);
export const verifyToken = () => API.get("/auth/verify");
export const getProfile = () => API.get("/auth/profile");
export const logout = () => API.get("/auth/logout");

// Home

export const getHomePageData = () => API.get("/property/home");
export const getHomePageBanners = () => API.get("/banner/home");

// Support

export const getFAQ = () => API.get("/support/faq");
export const sendFeedback = (data) => API.post("/support/feedback", data);
export const sendContactus = (data) => API.post("/support/contact-us", data);
export const sendNewsLetter = (data) => API.post("/support/news-letter", data);
export const getTickets = (data) => API.get("/support/tickets");
export const createTicket = (data) => API1.post("/support/ticket/new", data);

// Search

export const getSuggestions = (data) => API.post("/search/suggest", data);
export const getFilterData = (data) => API.post("/search/filter", data);

// Property

export const getCity = () => API.get("/property/city");
export const getLocality = (data) => API.post("/property/locality", data);
export const getDraftProperty = () => API.get("/property/draft");
export const saveProperty = (data) => API.post("/property/save", data);
export const getEditProperty = (id) => API.get("/property/edit/" + id);
export const updateProperty = (id, data) =>
  API.put("/property/update/" + id, data);
export const updatePropertyActive = (data) => API.put("/property/active", data);
export const uploadPropImg = (data) =>
  API1.post("/property/upload-image", data);
export const getPropertyInfo = (id) => API.get("/property/info/" + id);
export const getSimilarProperty = (id) => API.get("/property/similar/" + id);
export const addSiteVisit = (data) =>
  API.post("/property/site-visit/add", data);
export const addContacted = (data) => API.post("/property/contacted/add", data);
export const getCompareProperty = (data) =>
  API.post("/property/compare/info", data);
export const getRecommendationProperty = () =>
  API.get("/property/recommendation");

// Activity

export const getShortlisted = (data) => API.get("/activity/shortlisted", data);
export const addShortlisted = (data) =>
  API.post("/activity/shortlist/add", data);
export const removeShortlisted = (data) =>
  API.post("/activity/shortlist/remove", data);
export const getViewed = () => API.get("/activity/viewed");
export const addViewedData = (data) => API.post("/activity/viewed/add", data);
export const addSearchData = (data) => API.post("/activity/history/add", data);
export const getSearchHistory = () => API.get("/activity/history");
export const getSiteVisits = () => API.get("/activity/site-visits");
export const getContacted = () => API.get("/activity/contacted");

// Account

export const getListings = () => API.get("/property/my-listings");
export const deleteProperty = (id) => API.delete("/property/" + id);
export const getPropertyVisits = () => API.get("/property/site-visits/1");
export const getLeads = () => API.get("/property/leads/1");

// Blog

export const getBlogs = (id) => API.get("/blog/" + id);
export const getBlogDetail = (id) => API.get("/blog/data/" + id);
export const getCategories = () => API.get("/blog/categories");
export const getBlogProperties = (id) => API.get("/blog/properties/" + id);

// Ads

export const getAds = (id) => API.get("/ad/" + id);

// Requirement

export const sendRequirement = (data) => API.post("/requirement/add", data);

// Sitemap

export const getSitemap = () => API.get("/sitemap");
