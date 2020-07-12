if (registerPaint) {
  class CornerCircle {
    static get inputProperties () {
      return ['--circle-color', '--circle-radius']
    }

    paint(ctx, size, props) {
      const circleColor = props.get('--circle-color').toString()
      const circleR = props.get('--circle-radius').value
      const { width, height } = size
      console.log('paint', width, height, circleR, circleColor)
      ctx.fillStyle = circleColor
      ctx.beginPath()
      ctx.arc(0, 0, circleR, 0, 2 * Math.PI)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(width, 0, circleR, 0, 2 * Math.PI)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(width, height, circleR, 0, 2 * Math.PI)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(0, height, circleR, 0, 2 * Math.PI)
      ctx.fill()
    }
  }

  class Box {
    static get inputProperties () {
      return ['--box-color', '--box-width']
    }

    /**
     * 绘制函数
     * @param {CanvasRenderingContext2D} ctx 
     */
    paint (ctx, size, props) {
      const boxColor = props.get('--box-color').toString()
      const boxWidth = props.get('--box-width').value
      const { width, height } = size
      console.log('paint', width, height, boxWidth)
      ctx.fillStyle = boxColor
      // ctx.beginPath()
      // ctx.rect(0, 0, width * boxWidth / 100, height)
      // ctx.fill()
      ctx.fillRect(0, 0, width * boxWidth / 100, height)
    }
  }

  class GlassEffect {
    static get inputProperties () {
      return ['--glass-offset', '--glass-width']
    }

    static get inputArguments () {
      return ['<length>']
    }

    /**
     * 绘制函数
     * @param {CanvasRenderingContext2D} ctx 
     */
    paint (ctx, size, props, args) {
      const glassOffset = props.get('--glass-offset').value
      const glassWidth = props.get('--glass-width').value
      const { width, height } = size
      console.log(size, props, args)
      console.log('paint', width, height, glassOffset, glassWidth)
      const glassX = width * glassOffset / 100
      const start = glassX - glassWidth * 0.5
      const end = glassX + glassWidth * 0.5
      const grd = ctx.createLinearGradient(start, 0, end, 0)
      grd.addColorStop(0, 'rgba(255, 255, 255, 0)')
      grd.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)')
      grd.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)')
      grd.addColorStop(0.8, 'rgba(255, 255, 255, 0.1)')
      grd.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = grd
      ctx.fillRect(start, 0, glassWidth, height)
    }
  }

  class LineMove {
    static get inputProperties () {
      return ['--line-offset', '--line-color', '--line-length']
    }

    /**
     * 绘制函数
     * @param {CanvasRenderingContext2D} ctx 
     */
    paint (ctx, size, props) {
      const lineOffset = props.get('--line-offset').value
      const lineColor = props.get('--line-color').toString()
      const lineLength = props.get('--line-length').value
      const { width, height } = size
      console.log('paint', lineOffset, lineColor, lineLength)
      const offset = (width + height) * 2 * ((lineOffset / 100) % 1)
      const top = width
      const right = width + height
      const bottom = width * 2 + height
      const left = (width + height) * 2
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 6
      ctx.beginPath()

      if (offset < top) {
        ctx.moveTo(offset, 0)
        if (offset + lineLength > top) {
          ctx.lineTo(width, 0)
          ctx.lineTo(width, offset + lineLength - top)
        } else {
          ctx.lineTo(offset + lineLength, 0)
        }
      } else if (offset < right) {
        const start = offset - top
        ctx.moveTo(width, start)
        if (offset + lineLength > right) {
          ctx.lineTo(width, height)
          ctx.lineTo(width - (lineLength - (right - offset)), height)
        } else {
          ctx.lineTo(width, offset - width + lineLength)
        }
      } else if (offset < bottom) {
        const start = width - (offset - right)
        ctx.moveTo(start, height)
        if (offset + lineLength > bottom) {
          ctx.lineTo(0, height)
          ctx.lineTo(0, height - (lineLength - (bottom - offset)))
        } else {
          ctx.lineTo(start - lineLength, height)
        }
      } else if (offset < left) {
        const start = height - (offset - bottom)
        ctx.moveTo(0, start)
        if (offset + lineLength > left) {
          ctx.lineTo(0, 0)
          ctx.lineTo(offset + lineLength - left, 0)
        } else {
          ctx.lineTo(0, start - lineLength)
        }
      }

      ctx.stroke()
    }
  }

  registerPaint('corner-circle', CornerCircle)
  registerPaint('box', Box)
  registerPaint('glass-effect', GlassEffect)
  registerPaint('line-move', LineMove)
}
