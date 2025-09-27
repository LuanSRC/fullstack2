const User = require("../models/UserModel.js");

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] }, // expõe name, email, role, id, etc.
      });
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async store(req, res) {
    try {
      let { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Missing required fields: name, email, password",
        });
      }
      if (role !== undefined) {
        if (typeof role === "string") {
          role = role.trim().toLowerCase();
        }
        const allowed = ["user", "admin"];
        if (!allowed.includes(role)) {
          return res
            .status(400)
            .json({ message: "Invalid role. Allowed: user, admin" });
        }
      }
      const created = await User.create({ name, email, password, role });
      const { password: _pw, ...safe } = created.get({ plain: true });
      res.setHeader("Location", `/users/${safe.id}`);
      return res.status(201).json(safe);
    } catch (err) {
      if (err?.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Email already in use" });
      }
      if (err?.name === "SequelizeValidationError") {
        return res.status(400).json({
          message: "Validation error",
          details: err.errors?.map((e) => e.message),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      let { name, email, password, role } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (role !== undefined) {
        if (typeof role === "string") {
          role = role.trim().toLowerCase();
        }
        const allowed = ["user", "admin"];
        if (!allowed.includes(role)) {
          return res
            .status(400)
            .json({ message: "Invalid role. Allowed: user, admin" });
        }
      }

      // atualiza apenas campos fornecidos
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      if (password !== undefined) user.password = password;
      if (role !== undefined) user.role = role;

      await user.save();

      const { password: _pw, ...safe } = user.get({ plain: true });
      return res.status(200).json(safe);
    } catch (err) {
      if (err?.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Email already in use" });
      }
      if (err?.name === "SequelizeValidationError") {
        return res.status(400).json({
          message: "Validation error",
          details: err.errors?.map((e) => e.message),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      const id = Number.parseInt(req.params.id, 10);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ message: "Invalid id" });
      }

      const deletedCount = await User.destroy({ where: { id } });
      if (deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();
