import { Mapper } from "../mapper";
import { Entity } from "../entities/entity";
import { User } from "../entities/user";

describe('Dynamic mapper testing', () => {
    it('should map all entity props', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const result = Mapper.mapToCreate<Entity>(new Entity(), data)
        expect(result).toEqual({
            idReward:  1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            partner: {},
            category: {},
            subcategory: {},
            ecommerce: {},
            discount: {},
        })
    })
    it('should map only the props that are in the pick option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const result = Mapper.mapToCreate<Entity>(new Entity(), data, { pick: ['idReward', 'name', 'description'] })
        expect(result).toEqual({
            idReward:  1,
            name: '',
            description: ''
        })
    })
    it('should map only the props that are not in the omit option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const result = Mapper.mapToCreate<Entity>(new Entity(), data, { omit: ['idReward', 'name', 'description'] })
        expect(result).toEqual({
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            partner: {},
            category: {},
            subcategory: {},
            ecommerce: {},
            discount: {},
        })
    })
    it('should throw error valid unique option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        expect(()=> Mapper.mapToCreate<Entity>(new Entity(), data, { omit: ['idReward'], pick: ['name'] })).toThrowError('Options parameter must have pick or omit but no both')
    })
    it('should map all user entity props', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const result = Mapper.mapToCreate<User>(new User(), data)
        expect(result).toEqual({
            name: '',
            description: '',
            image: ''
        })
    })
    it('should rename especific props', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const result = Mapper.mapToCreate<User>(new User(), data, {rename: {name: 'userName', description: 'desc'}})
        expect(result).toEqual({
            userName: '',
            desc: '',
            image: ''
        })
    })
    it('should rename and omit especific props', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            image: '',
            imageAlt: '',
            legal: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            orderHighlight: 1,
            imageHighlight: '',
            orderNovelty: 1,
            createdAt: new Date,
            updatedAt: new Date,
            createdByUser: '',
            updatedByUser: '',
            partner: {},
            category: {},
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }
        const result = Mapper.mapToCreate<User>(new User(), data, { omit: ['image'] ,rename: {name: 'userName', description: 'desc'}})
        expect(result).toEqual({
            userName: '',
            desc: ''
        })
    })
})