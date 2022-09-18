// @description: the module runs on the middleware is for
// 1: select qery
// 2: paggination qery
// 3: sort qery
// create operator ($greater etc)


const advanceResults = (model,populate) => async( req, res, next) => {
    let query
    // //// copy request query
         const reqQuery = {...req.query}
        //  create qeury string
        // field to exclude
        const removeField = ['select','sort','page','limit']
        // loop over remove field and delete them from reqest qery
        removeField.forEach(param => delete reqQuery[param])
         console.log(reqQuery)
        let queryStr = JSON.stringify(reqQuery)
        //  create operator ($greater etc)
         queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
           console.log(queryStr)
        //    findinding request
         query = model.find(JSON.parse(queryStr))
        //  executing resourese
        // SELECT FIELDS 
        if(req.query.select){
            const fields = req.query.select.split(',').join(' ')
            // console.log(fields)
            query = query.select(fields)
        }
        // ?sorting query
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            // console.log(sortBy)
            query.query.sort(sortBy)
  
        } else{
            query = query.sort('-createdAt')
        }
  
        // pagginations
        const page = parseInt(req.query.page, 10) || 1
        const limit = parseInt(req.query.limit, 10) || 25
        const startIndex = (page - 1)* limit
        const endIndex = page * limit
        const total = await model.countDocuments()
        query = query.skip(startIndex).limit(limit)
  
        if(populate){
            query = query.populate(populate)
        }
            const result = await query;
  
            //  pagination result 
            const pagination = {}
            if(endIndex < total){
                pagination.next = {
                    page: page + 1,
                    limit
                }
            }
            if(startIndex > 0){
                pagination.prev = {
                    page: page - 1,
                    limit
                }
            }
            res.advanceResults = {
                success: true,
                count: result.length,
                pagination,
                data: result
            }
            next()
}
module.exports = advanceResults