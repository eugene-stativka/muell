import { Injectable } from '@angular/core'
import { Meta, MetaDefinition, Title } from '@angular/platform-browser'

type MetaDataConfig = Readonly<{
  description: string
  image: string
  title: string
}>

const defaultMetaDataConfig: MetaDataConfig = {
  description: 'Recycling in 🇩🇪',
  image: '/assets/logo.svg',
  title: 'Müll',
} as const

@Injectable({
  providedIn: 'root',
})
export class PageMetaService {
  constructor(private readonly meta: Meta, private readonly title: Title) {}

  setMetaData(config: Partial<MetaDataConfig> = defaultMetaDataConfig) {
    const description = config.description || defaultMetaDataConfig.description
    const image = config.image || defaultMetaDataConfig.image
    const title = config.title || defaultMetaDataConfig.title

    this.title.setTitle(title)

    const tags: ReadonlyArray<MetaDefinition> = [
      { name: 'description', content: description },
      { name: 'theme-color', content: '#C3002F' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:image', content: image },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      { name: 'apple-mobile-web-app-title', content: title },
      { name: 'apple-touch-startup-image', content: image },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
    ]

    tags.forEach(tag => this.meta.updateTag(tag))
  }
}
