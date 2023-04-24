/**
 * Checks whether IAP is enabled in this session.
 * @returns {boolean} True if IAP is available to the user. False if IAP is not supported on the current platform,
 * the player's device, or the IAP service failed to load properly.
 */
export function isEnabled(): boolean {
    return (window as any).Wortal.iap.isEnabled();
}

/**
 * Gets the catalog of available products the player can purchase.
 * @example
 * Wortal.iap.getCatalogAsync()
 *  .then(products => console.log(products));
 * @returns {Promise<Product[]>} Array of products available to the player. Returns an empty list if purchases are
 * not supported in the player's region.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * <li>PAYMENTS_NOT_INITIALIZED</li>
 * <li>NETWORK_FAILURE</li>
 * </ul>
 */
export function getCatalogAsync(): Promise<Product[]> {
    return (window as any).Wortal.iap.getCatalogAsync();
}

/**
 * Gets the purchases the player has made that have not yet been consumed. Purchase signature should be
 * validated on the game developer's server or transaction database before provisioning the purchase to the player.
 * @example
 * Wortal.iap.getPurchasesAsync()
 *  .then(purchases => console.log(purchases));
 * @returns {Promise<Purchase[]>} Array of purchases.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * <li>PAYMENTS_NOT_INITIALIZED</li>
 * <li>NETWORK_FAILURE</li>
 * </ul>
 */
export function getPurchasesAsync(): Promise<Purchase[]> {
    return (window as any).Wortal.iap.getPurchasesAsync();
}

/**
 * Attempts to make a purchase of the given product. Will launch the native IAP screen and return the result.
 * @example
 * Wortal.iap.makePurchaseAsync({
 *     productID: 'my_product_123',
 * }).then(purchase => console.log(purchase));
 * @param purchase Object defining the product ID and purchase information.
 * @returns {Promise<Purchase>} A Promise that resolves when the product is successfully purchased by the player. Otherwise, it rejects.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * <li>PAYMENTS_NOT_INITIALIZED</li>
 * <li>INVALID_PARAM</li>
 * <li>NETWORK_FAILURE</li>
 * <li>INVALID_OPERATION</li>
 * <li>USER_INPUT</li>
 * </ul>
 */
export function makePurchaseAsync(purchase: PurchaseConfig): Promise<Purchase> {
    return (window as any).Wortal.iap.makePurchaseAsync(purchase);
}

/**
 * Consumes a specific purchase belonging to the current player. Before provisioning a product's effects to the player,
 * the game should request the consumption of the purchased product. Once the purchase is successfully consumed,
 * the game should immediately provide the player with the effects of their purchase. This will remove the
 * purchase from the player's available purchases inventory and reset its availability in the catalog.
 * @example
 * Wortal.iap.consumePurchaseAsync('abc123');
 * @param token The purchase token of the purchase that should be consumed.
 * @returns {Promise<void>} A Promise that resolves when the purchase is successfully consumed. Otherwise, it rejects.
 * @throws {ErrorMessage} See error.message for details.
 * <ul>
 * <li>NOT_SUPPORTED</li>
 * <li>CLIENT_UNSUPPORTED_OPERATION</li>
 * <li>PAYMENTS_NOT_INITIALIZED</li>
 * <li>INVALID_PARAM</li>
 * <li>NETWORK_FAILURE</li>
 * </ul>
 */
export function consumePurchaseAsync(token: string): Promise<void> {
    return (window as any).Wortal.iap.consumePurchaseAsync(token);
}

/**
 * A product that the player can purchase.
 */
export interface Product {
    /**
     * Title of the product
     * */
    title: string,
    /**
     * ID of the product
     * */
    productID: string,
    /**
     * Text description of the product
     * */
    description?: string,
    /**
     * A URL to the product's image
     * */
    imageURI?: string,
    /**
     * A localized string representing the product's price in the local currency, e.g. "$1"
     * */
    price: string,
    /**
     * A string representing which currency is the price calculated in, following [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
     * */
    priceCurrencyCode: string
}

/**
 * Configuration for a purchase.
 */
export interface PurchaseConfig {
    /**
     * ID of the product
     * */
    productID: string,
    /**
     * Optional payload assigned by game developer, which will be also attached in the signed purchase request
     * */
    developerPayload?: string
}

/**
 * A purchase transaction.
 */
export interface Purchase {
    /**
     * Optional payload assigned by game developer, which will be also attached in the signed purchase request
     * */
    developerPayload?: string,
    /**
     * ID of the payment (e.g. Google Play Order)
     * */
    paymentID: string,
    /**
     * ID of the product
     * */
    productID: string,
    /**
     * Timestamp of the payment
     * */
    purchaseTime: string,
    /**
     * Token for purchase consumption
     * */
    purchaseToken: string,
    /**
     * Signature of the purchase info for server side verification
     * */
    signedRequest: Signature
}

/**
 * A signature that can be verified on game's backend server.
 * Server side validation can be done by following these steps:
 *
 * 1. Split the signature into two parts delimited by the `.` character.
 * 2. Decode the first part with base64url encoding, which should be a hash.
 * 3. Decode the second part with base64url encoding, which should be a string representation of an JSON object.
 * 4. Hash the second part string using HMAC SHA-256 and the app secret, check if it is identical to the hash from step 2.
 * 5. Optionally, developer can also validate the timestamp to see if the request is made recently.
 */
export type Signature = string;