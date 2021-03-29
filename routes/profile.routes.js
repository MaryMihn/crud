const {Router} = require('express')
const router = Router()
const Profile = require('../models/Profile')
const auth = require('../middlewere/auth.middlewere')
const config = require('config')
const shotrId = require('shortid')

router.post('/generate', auth ,async(req, res)=>{
    try{
        // const baseUrl= config.get('baseUrl')
        const {lastname, name, age} = req.body

        const code = shotrId.generate()

       const existing = await Profile.findOne({ lastname, name, age})

       if(existing){
          return  res.json({profile:existing})
       }

       const profile = new Profile ({
           owner : req.user.userId, code,lastname, name, age
       })

       await profile.save ()
       res.status(201).json({profile})

    }catch (e) {
        res.status(500).json({message:e.message})
    }
})

router.get('/', auth, async(req, res)=>{
    try{
        const profiles = await Profile.find({owner : req.user.userId})
        res.json(profiles)
    }catch (e) {
        res.status(500).json({message:e.message})
    }
})

router.get('/:id', auth, async(req, res)=>{
    try{
        // console.log(req.params.id)
        const profile = await Profile.findById(req.params.id)
        // console.log(profile, "profile")
        res.json(profile)
    }catch (e) {
        res.status(500).json({message:"e.message"})
    }
})



router.delete('/delete/:id', auth ,async(req, res)=>{
    try{
        console.log(req.params)
        const profi = await Profile.findById(req.params.id)

        // res.json(profi)
        if (profi.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
        await profi.remove()
        res.status(201).json({message: "Succesfully deleted"})

    }catch (e) {
        res.status(500).json({message:e.message})
    }
//  finally {
//       await client.close();
//     }



    //     const {lastname, name, age} = req.body

    //     const code = shotrId.generate()

    //    const existing = await Profile.findOne({ lastname, name, age})

    //    if(existing){
    //       return  res.json({profile:existing})
    //    }

    //    const prof = new Profile ({
    //        owner : req.user.userId, code, lastname, name, age
    //    })

    //    await prof.save ()
    //    res.status(201).json({profile})

    
})

module.exports = router