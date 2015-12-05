function CRUD() {
  var _ = require('underscore');

  function create(model, data, res) {
    var object = new model(data);
    object.save(function (err, record) {

      if (err) {
        res.send({
          isValid: false,
          message: err.toString()
        });
      } else {
        res.send({
          isValid: true,
          data: record,
          message: 'Create',
          err: err
        });
      }
    });
  }

  function update(model, id, data, res) {
    model.findByIdAndUpdate(id, {
      $set: data
    }, function (err, record) {
      if (err) {
        res.send({
          isValid: false,
          message: err.toString()
        });
      } else {
        res.send({
          isValid: true,
          data: record,
          message: 'Update complete'
        });
      }
    });
  }

  this.list = function (model, req, res, next) {
    //console.log('list req');
    var queryKey = 'API-QUERY';
    var populateKey = 'API-POPULATE';
    var limitKey = 'API-LIMIT';
    var skipKey = 'API-SKIP';
    var sortKey = 'API-SORT';

    var searchQuery = !_.isUndefined(req.header(queryKey)) ? JSON.parse(
      req.header(queryKey)) : null;
    var populate = !_.isUndefined(req.header(populateKey)) ? req.header(
      populateKey) : null;
    var limit = !_.isUndefined(req.header(limitKey)) && req.header(
      limitKey) ? req.header(limitKey) : null;
    var skip = !_.isUndefined(req.header(skipKey)) && req.header(
      skipKey) ? req.header(skipKey) : null;
    var sort = !_.isUndefined(req.header(sortKey)) ? req.header(
      sortKey) : null;
    var query;

    try {
      populate = JSON.parse(populate);
    } catch (e) {
      // Nope, not JSON.
    }

    if (!_.isNull(searchQuery) && searchQuery != '') {
      if (_.isObject(searchQuery)) {
        if (_.has(searchQuery, 'query') && _.has(searchQuery, 'fields')) {
          query = model.find(searchQuery.query, searchQuery.fields);
        } else if (_.has(searchQuery, 'query')) {
          query = model.find(searchQuery.query);
        } else {
          query = model.find(searchQuery);
        }

        if (_.has(searchQuery, 'sort')) {
          query = query.sort(searchQuery.sort);
        }
      } else {
        query = model.find(searchQuery);
      }
    } else {
      query = model.find();
    }


    if (!_.isNull(populate)) {
      if (_.isObject(populate)) {
        if (_.has(populate, 'document') && _.has(populate, 'fields')) {
          query.populate(populate.document, populate.fields);
        } else if (_.has(populate, 'document')) {
          query.populate(populate.document);
        } else if (Array.isArray(populate)) {
          for (var i = 0; i < populate.length; i++) {
            query.populate(populate[i]);
          }
        } else {
          query.populate(populate);
        }
      } else {
        query.populate(populate);
      }
    }
    if (!_.isNull(skip)) query.skip(skip);
    if (!_.isNull(limit) && limit != '') query.limit(limit);
    if (!_.isNull(sort)) query.sort(sort);

    //console.log(query);
    query.exec(function (err, records) {
      if (err) {
        res.send({
          isValid: false,
          message: err.toString()
        });
      } else {
        query.count(function (err, cnt) {
          res.send({
            isValid: true,
            pagination: {
              count: cnt,
              limit: limit,
              skip: skip,
              sort: sort,
              query: searchQuery,
              populate: populate
            },
            data: records
          });
        });
      }
    });

    return next;
  };

  this.get = function (model, req, res, next) {
    var id = req.params.id;

    model.findById(id, function (err, object) {
      if (err) {
        res.send({
          isValid: false,
          message: err.toString()
        });
      } else {
        res.send({
          isValid: true,
          data: object
        });
      }
    });

    return next;
  };

  this.put = function (model, req, res, next) {
    var id = req.params.id;

    if (id) {
      var data = req.params;
      delete data.id;

      update(model, id, data, res);
    }

    return next;
  }

  this.post = function (model, req, res, next) {
    var id = req.params.id;
    var data = req.body;
    delete data._id;
    if (id) {
      update(model, id, data, res);
    } else {
      create(model, data, res);
    }

    return next;
  }

  this.delete = function (model, req, res, next) {
    var id = req.params.id;

    if (id) {
      model.findByIdAndRemove(id, function (err, record) {
        res.send({
          isValid: true,
          message: 'Deleted.'
        });
      });
    }

    return next;
  }

  this.configure = function (router, url, route) {
    router.get(url, route.list);
    router.get(url + '/:id', route.get);

    router.put(url + '/:id', route.put);

    router.post(url, route.post);
    router.post(url + '/:id', route.post);

    router.delete(url + '/:id', route.delete);
  }
}

module.exports = new CRUD();
