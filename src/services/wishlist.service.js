import Axios from "../config/httpRequests.js";

class WishlistService {
    async getWishlists() {
        return await Axios.get("/ecommerce/wishlists/");
        
    }
    async toggleWishlist(productId) {
        return await Axios.patch(`/ecommerce/wishlists/toggle/${productId}`);
    }
   async removeFromWishlist(productId) {
        return await Axios.delete(`/ecommerce/wishlists/delete/${productId}`);
    }
    async clearWishlist() {
        return await Axios.delete("/ecommerce/wishlists/clear");
    }


}
    export default new WishlistService();