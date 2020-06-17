exports.mixed = {
  default: '${path} tidak valid',
  required: 'Bidang ${label} harus diisi',
  oneOf: '${path} harus mengandung salah satu dari nilai berikut: ${values}',
  notOneOf: '${path} tidak dapat mengandung nilai-nilai berikut: ${values}'
};

exports.string = {
  length: '${path} harus mengandung karakter ${length} persis',
  min: '${path} harus mengandung setidaknya ${min} karakter',
  max: '${path} harus mengandung paling banyak ${max} karakter',
  matches: '${path} harus mengikuti aturan: "${regex}"',
  email: '${path} harus berupa alamat email yang valid',
  url: '${path} harus berupa URL yang valid',
  trim: '${path} tidak boleh mengandung spasi',
  lowercase: '${path} hanya berisi huruf kecil',
  uppercase: '${path} hanya berisi huruf besar'
};

exports.number = {
  min: '${path} harus lebih besar dari atau sama dengan ${min}',
  max: '${path} harus kurang dari atau sama dengan ${max}',
  lessThan: '${path} harus kurang dari ${less}',
  moreThan: '${path} harus lebih besar dari ${more}',
  notEqual: '${path} tidak boleh sama "${notEqual}"',
  positive: '${path} harus berupa angka positif',
  negative: '${path} harus berupa angka negatif',
  integer: '${path} harus berupa bilangan bulat'
};

exports.date = {
  min: '${path} harus setelah ${min}',
  max: '${path} harus sebelumnya ${max}'
};

exports.boolean = {};

exports.object = {
  noUnknown: 'bidang ${path} tidak boleh berisi kunci yang tidak ditentukan'
};

exports.array = {
  min: 'bidang ${path} harus mengandung setidaknya ${min} item',
  max: 'bidang ${path} harus mengandung paling banyak ${max} item'
};

module.exports = exports
