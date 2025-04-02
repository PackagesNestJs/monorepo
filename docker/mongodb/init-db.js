db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || "mydatabase");

db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME || "admin",
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD || "secret",
  roles: [{ role: "readWrite", db: process.env.MONGO_INITDB_DATABASE || "mydatabase" }],
});

db.createCollection("users");
db.users.insertOne({ name: "Tài", email: "tai@example.com" });

print("✅ Database and user created successfully!");
