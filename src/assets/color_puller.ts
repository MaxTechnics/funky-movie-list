import { FastAverageColor } from 'fast-average-color'

const fac = new FastAverageColor();

// convert css rgb(0, 0, 0) to {r: 0, g: 0, b: 0}
const cssrgb_to_rgb = (rgb: string) => {
    const rgb_array = rgb.replace('rgb(', '').replace(')', '').split(',')
    return {
        r: parseInt(rgb_array[0]),
        g: parseInt(rgb_array[1]),
        b: parseInt(rgb_array[2])
    }
}

export const get_palette = async (image_path: string) => {
    const color = await fac.getColorAsync(image_path)
    return cssrgb_to_rgb(color.rgb)
}
