import { client } from './client'
import { groq } from 'next-sanity'

// Types
export interface HeroData {
  subtitle: string
  titleLine1: string
  titleLine2: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
}

export interface PhilosophieValue {
  icon: string
  title: string
  description: string
}

export interface PhilosophieData {
  sectionTitle: string
  mainTitle: string
  introduction: string
  values: PhilosophieValue[]
}

export interface ServiceData {
  _id: string
  name: string
  slug: { current: string }
  price: number
  description: string
  features: string[]
  deliveryTime: string
  isPopular: boolean
  order: number
}

export interface ProjetData {
  _id: string
  title: string
  slug: { current: string }
  image: {
    asset: {
      _ref: string
      url: string
    }
  } | null
  categories: string[]
  categoryLabel: string
  description: string
  tags: string[]
  url: string | null
  year: string
  color: 'sage' | 'terracotta' | 'clay'
  order: number
}

export interface SiteSettingsData {
  siteName: string
  siteDescription: string
  contactEmail: string
  location: string
}

// Queries
const heroQuery = groq`*[_type == "hero"][0]{
  subtitle,
  titleLine1,
  titleLine2,
  description,
  primaryButtonText,
  secondaryButtonText
}`

const philosophieQuery = groq`*[_type == "philosophie"][0]{
  sectionTitle,
  mainTitle,
  introduction,
  values
}`

const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  name,
  slug,
  price,
  description,
  features,
  deliveryTime,
  isPopular,
  order
}`

const projetsQuery = groq`*[_type == "projet"] | order(order asc, year desc){
  _id,
  title,
  slug,
  "image": image{
    asset->{
      _ref,
      url
    }
  },
  categories,
  categoryLabel,
  description,
  tags,
  url,
  year,
  color,
  order
}`

const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  contactEmail,
  location
}`

// Fetch functions
export async function getHero(): Promise<HeroData | null> {
  return client.fetch(heroQuery)
}

export async function getPhilosophie(): Promise<PhilosophieData | null> {
  return client.fetch(philosophieQuery)
}

export async function getServices(): Promise<ServiceData[]> {
  return client.fetch(servicesQuery)
}

export async function getProjets(): Promise<ProjetData[]> {
  return client.fetch(projetsQuery)
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  return client.fetch(siteSettingsQuery)
}
