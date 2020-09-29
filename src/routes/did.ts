import { Router } from 'express';
import didCtrl from '../controllers/did';
import { verifyReCaptcha } from '../middleware/auth'

const router = Router()

// GET:  /api/did/create?name=
router.get('/create', verifyReCaptcha, didCtrl.create)


// TODO:  this is wrong way: we need to figure out how we can handle both the apis (/create and /create_tmp)
// Acutally the studio-server need to call /create api but it does not have recaptha token
// I am being too lazy to think how to fix this..hence it way!
router.get('/create_tmp', didCtrl.create)

// POST: /api/did/update
router.post('/update', didCtrl.update)

// GET:  /api/did/resolve?did=

router.get('/resolve', (req, res) => {
    res.status(200).send({
       network: "Hypersign Id Network"
    })
})

router.get('/resolve/:did', didCtrl.raw)

router.get('/list', didCtrl.list)

export default router


