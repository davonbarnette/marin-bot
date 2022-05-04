class NumberUtils {
    static numberWithCommas(x:number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

export default NumberUtils;