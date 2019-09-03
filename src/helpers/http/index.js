module.exports.sendError = (res, message) => ({
  badRequest: () => res.status(400).send({ code: 'BAD_REQUEST_ERROR', error: message }),
  notFound: () => res.status(404).send({ code: 'NOT_FOUND', error: message }),
  entityExists: () => res.status(409).send({ code: 'ENTITY_ALREAY_EXISTS', error: message}),
  missingField: () => res.status(422).send({ code: 'REQUIRED_FIELD_MISSING', error: message }),
  internal: () => res.status(500).send({ code: 'SERVER_ERROR', error: message }),
  unsecureType: () => res.status(415).send({ code: 'UNSECURE_HEADER_TYPE', error: message }),
})

module.exports.sendSuccess = (res, message={}, data = {}) => ({
  success: () => res.status(200).send({ message, data }),
  created: () => res.status(201).send({ message, data }),
  noContent: () => res.status(204).send(),
})