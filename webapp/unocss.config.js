import { defineConfig } from 'unocss'
import { transformerVariantGroup } from 'unocss'

export default defineConfig({
    // ...UnoCSS options
    transformers: [transformerVariantGroup()],
})
