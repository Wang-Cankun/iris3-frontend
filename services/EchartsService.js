export default {
  downloadImg(echarts, type = 'png') {
    const img = new Image()
    img.src = echarts.getDataURL({
      type,
      pixelRatio: 2,
      backgroundColor: '#fff',
    })
    const link = document.createElement('a')
    link.href = img.src
    link.setAttribute('download', `Image_png.${type}`)
    document.body.appendChild(link)
    link.click()
    return 1
  },
}
