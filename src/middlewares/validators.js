// custom middleware

function validateItemsId(req, res, next) {
  const { id } = req.params;

  Items.get(id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: 'Invalid project id' });
      }
    });
}

function validateItems(req, res, next) {
  if (Object.keys(req.body).length) {
    if ('name' in req.body && 'description' in req.body) {
      next();
    } else {
      res.status(400).json({ message: 'missing or empty required name field' });
    }
  } else {
    res.status(400).json({ message: 'missing project data' });
  }
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length) {
    if ('description' in req.body && 'notes' in req.body) {
      next();
    } else {
      res.status(400).json({ message: 'missing required notes and description field' });
    }
  } else {
    res.status(400).json({ message: 'missing action data' });
  }
}
