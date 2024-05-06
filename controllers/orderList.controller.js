const listModel = require(`../models/index`).order_list

exports.getAllList = async (req, res) => {
  let list = await listModel.findAll()
  if (list.length === 0) {
    return res.status(400).json({
      success: false,
      message: `data list tidak ada`,
    })
  }
  return res.json({
    success: true,
    data: list,
    message: `data list telah di tampilkan`,
  })
}


exports.findList = async (req, res) => {
  let keyword = req.params.key

  let list = await listModel.findAll({
    where: {
      [Op.or]: [
        { orderList_id: { [Op.substring]: keyword } },
        { customer_name: { [Op.substring]: keyword } },
        { order_type: { [Op.substring]: keyword } },
        { order_date: { [Op.substring]: keyword } },
      ]
    }
  })
  return res.json({
    success: true,
    data: list,
    message: `list ditemukan`
  })
}

exports.addList = async (req, res) => {
  let newList = {
    customer_name: req.body.customer_name,
    order_type: req.body.order_type,
    order_date: req.body.order_date
  }

  listModel.create(newList)
    .then(result => {
      return res.json({
        success: true,
        data: result,
        message: `data list berhasil ditambahkan`
      })
    })
    .catch(error => {
      console.log(error.message)
      return res.status(400).json({
        success: false,
        message: `data list gagal ditambahkan`
      })
    })
}

exports.updateList = async (req, res) => {
  let listID = req.params.id

  let dataList = {
    customer_name: req.body.customer_name,
    order_type: req.body.order_type,
    order_date: req.body.order_date
  }

  listModel.update(dataList, { where: { orderList_id: listID } })
    .then(result => {
      return res.json({
        success: true,
        message: `data list berhasil diupdate`
      })
    })
    .catch(error => {
      console.log(error.message)
      return res.status(400).json({
        success: false,
        message: `data list gagal diupdate`
      })
    })
}

exports.deleteList = async (req, res) => {
  let listID = req.params.id

  listModel.destroy({ where: { orderList_id: listID } })
    .then(result => {
      return res.json({
        success: true,
        message: `data list telah di hapus`
      })
    })
    .catch(error => {
      console.log(error.message)
      return res.status(400).json({
        success: false,
        message: `data list gagal di hapus`
      })
    })
}