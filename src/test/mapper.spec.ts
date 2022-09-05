import { Mapper } from "../mapper";
import { Entity } from "../entities/entity";
import { User } from "../entities/user";
import { Category } from "../entities/category";

// { pick: { single: ['name', 'id'], object: { subCategory: ['name', 'description'] }, array: { rewards: ['desc','idNum']} }, { rename: { name: 'nombre', entitties:  [{ id: 'key'}, {name: 'nombre'}] } }}
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
    it('should map only the props that are in the single prps of pick option', () => {
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
        const result = mapper.mapToCreate<Entity>(new Entity(), data, { pick: { single: ['name', 'description', 'idReward'] }})
        expect(result).toEqual({
            idReward:  1,
            name: '',
            description: ''
        })
    })
    it('should map only the props that are in the single and complex prps of pick option', () => {
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
        const result = mapper.mapToCreate<Category>(new Category(), data, { pick: { single: ['name'], complex: { subCategory: ['name', 'description'] } }})
        expect(result).toEqual({
            name: '',
            subCategory: {
                name: '',
                description: ''
            }
        })
    })
    it('should map only the props that are in the single and complex and array props of pick option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
            stuff: [
                {
                    id: '',
                    name: ''
                },
                {
                    id: '',
                    name: ''
                }
            ],
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
        const result = mapper.mapToCreate<Category>(new Category(), data, { pick: { single: ['name'], complex: { subCategory: ['name', 'description'] }, array: { stuff: ['name', 'id']} }})
        expect(result).toEqual({
            name: '',
            subCategory: {
                name: '',
                description: ''
            },
            stuff: [{name: '', id: ''}, {name: '', id: ''}]
        })
    })

    it('should omit specific single props', ()=>{
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
        const result = mapper.mapToCreate<Entity>(new Entity(), data, { omit: { single: ['name', 'description', 'idReward'] }})
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

    it('should omit data in single and complex option', () => {
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
        const result = mapper.mapToCreate<Category>(new Category(), data, { omit: { single: ['name', 'stuff'], complex: { subCategory: ['description'] } }})
        expect(result).toEqual({
            status: 1,
            subCategory: {
                name: ''
            }
        })
    })

    it('should map only the props that are in the single and complex and array props of omit option', () => {
        const data = {
            idReward: 1,
            name: '',
            description: '',
            subCategory: {
                name: '',
                description: ''
            },
            stuff: [
                {
                    id: '',
                    name: ''
                },
                {
                    id: '',
                    name: ''
                }
            ],
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
        const result = mapper.mapToCreate<Category>(new Category(), data, { omit: { single: ['name'], complex: { subCategory: ['description'] }, array: { stuff: ['id']} }})
        expect(result).toEqual({
            status: 1,
            subCategory: {
                name: ''
            },
            stuff: [{name: ''}, {name: ''}]
        })
    })

    it('should rename single props', () => {
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
        const result = mapper.mapToCreate<Entity>(new Entity(), data, {rename: { single: [{idReward: 'id'}, {name: 'nombre'}, {description: 'desc'}]}})
        expect(result).toEqual({
            id:  1,
            nombre: '',
            desc: '',
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

    it('should rename single and complex props', () => {
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
            partner: {
                cat: '',
                name: '',
                title: ''
            },
            category: {
                status: 1,
                name: '',
                desc: ''
            },
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }

        const mapper = new Mapper()
        const result = mapper.mapToCreate<Entity>(new Entity(), data, { rename: { single: [{idReward: 'id'}, {name: 'nombre'}, {description: 'desc'}], complex: { partner: [{ cat: 'categoria'}], category: [{name: 'nombre'}]}}})
        expect(result).toEqual({
            id:  1,
            nombre: '',
            desc: '',
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
            partner: {
                categoria: '',
                name: '',
                title: ''
            },
            category: {
                status: 1,
                nombre: '',
                desc: ''
            },
            subcategory: {},
            ecommerce: {},
            discount: {},
        })
    })
    it('should rename single and complex props and omit props and sub props', () => {
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
            partner: {
                cat: '',
                name: '',
                title: ''
            },
            category: {
                status: 1,
                name: '',
                desc: ''
            },
            subcategory: {},
            channel: [],
            store: [],
            ecommerce: {},
            paymentMethod: [],
            discount: {},
            limitUser: []
        }

        const mapper = new Mapper()
        const result = mapper.mapToCreate<Entity>(new Entity(), data, 
            { 
                omit: { single: ['image', 'legal'], complex: { partner: ['name', 'title'], category: ['status'] }}, 
                rename: {
                single: [{idReward: 'id'}, {name: 'nombre'}, {description: 'desc'}], complex: { partner: [{ cat: 'categoria'}], category: [{name: 'nombre'}]}
            }
        })
        expect(result).toEqual({
            id:  1,
            nombre: '',
            desc: '',
            imageAlt: '',
            stock: 2,
            tags: '',
            reStockPoint: 1,
            rewardDays: '',
            status: 1,
            stockNotified: 1,
            notificationEmail: '',
            countUsed: 1,
            partner: {
                categoria: ''
            },
            category: {
                nombre: '',
                desc: ''
            },
            subcategory: {},
            ecommerce: {},
            discount: {},
        })
    })
})