import { api } from '../lib/axios'

export interface RegisterRestaurantParams {
  restaurantName: string
  managerName: string
  email: string
  phone: string
}

export async function registerRestaurant({ 
    email,
    managerName,
    phone,
    restaurantName,
 }: RegisterRestaurantParams) {
  await api.post('/restaurants', { email, managerName, phone, restaurantName })
}
