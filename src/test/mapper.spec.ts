import { Mapper } from "../mapper";
import { Entity } from "../entities/entity";
import { User } from "../entities/user";
import { Category } from "../entities/category";

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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Entity>(new Entity(), data)
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Entity>(new Entity(), data, { pick: ['idReward', 'name', 'description'] })
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Entity>(new Entity(), data, { omit: ['idReward', 'name', 'description'] })
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
        const mapper = new Mapper()
        expect(()=> mapper.mapToCreate<Entity>(new Entity(), data, { omit: ['idReward'], pick: ['name'] })).toThrowError('Options parameter must have pick or omit but no both')
    })
    it('should pick specific entities props and subEntities', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Category>(new Category(), data, {pick: ['name', 'subCategory.description']})
        expect(result).toEqual({
            name: '',
            subCategory: {
                description: ''
            }
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<User>(new User(), data, { omit: ['image'] ,rename: {name: 'userName', description: 'desc'}})
        expect(result).toEqual({
            userName: '',
            desc: ''
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<User>(new User(), data, {rename: {name: 'userName', description: 'desc'}})
        expect(result).toEqual({
            userName: '',
            desc: '',
            image: ''
        })
    })
    it('should pick and rename especific props', () => {
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<User>(new User(), data, {pick: ['image'], rename: { image: 'img' }})
        expect(result).toEqual({
            img: ''
        })
    })
    it('should omit specific entities props and subEntities', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Category>(new Category(), data, {omit: ['name', 'subCategory.description']})
        expect(result).toEqual({
            subCategory: {
                name: ''
            },
            status: 1
        })
    })

    it('should pick specific entities props, subEntities and rename', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Category>(new Category(), data, { pick: ['name', 'subCategory.description'], rename: { name: 'n', subCategory: 'sub' } })
        expect(result).toEqual({
            n: '',
            sub: {
                description: ''
            }
        })
    })

    it('should omit specific props, subEntities and rename', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
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
        const mapper = new Mapper()
        const result = mapper.mapToCreate<Category>(new Category(), data, { omit: ['subCategory.name'], rename: { name: 'n', subCategory: 'sub' } })
        expect(result).toEqual({
            n: '',
            status: 1,
            sub: {
                description: ''
            }
        })
    })
})