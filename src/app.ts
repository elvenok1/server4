import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

const flowBienvenido = addKeyword('hola').addAnswer('soy el bot')

const main = async () => {
    const provider = createProvider(BaileysProvider)

    // Inicialización del servidor HTTP para el proveedor Baileys
    provider.initHttpServer(3002)

    // Manejador de la ruta '/send-message' para enviar mensajes
    provider.http?.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const phone = req.body.phone
        const body = req.body
        const message = body.message
        const mediaUrl = body.mediaUrl     
        await bot.sendMessage(phone, message, {
            media: mediaUrl
            
        })
        res.end('esto es del server de polka')
    }))
    
    // Crear el bot con el flujo y proveedor especificado
    await createBot({
        flow: createFlow([flowBienvenido]),
        database: new MemoryDB(),
        provider
    })
}

// Llamar a la función principal para iniciar la aplicación
main()
