export const shortenEthAddy = (addy) => {
    const shorty = addy.slice(0,6) + "..." + addy.slice(37,41)
    return shorty
}