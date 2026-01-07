# 🚀 دليل الهجرة من Vercel Postgres إلى Supabase

## ✅ التعديلات المنجزة

### 1️⃣ تعديل `prisma/schema.prisma`
تم تحديث الـ datasource ليتوافق مع Supabase:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL") // الرابط اللي فيه pgbouncer (للتطبيقات)
  directUrl = env("DATABASE_URL")        // الرابط المباشر (للميجريشن)
}
```

**التغييرات الرئيسية:**
- ✅ `directUrl` الآن يستخدم `DATABASE_URL` بدلاً من `POSTGRES_URL_NON_POOLING`
- ✅ تم تحديث التعليقات لتعكس استخدام Supabase
- ✅ الـ `generator` تم نقله قبل الـ `datasource` (best practice)

---

### 2️⃣ تحديث `.env.local`
تم إنشاء ملف `.env.local` بالقيم الصحيحة لـ Supabase:

```env
POSTGRES_PRISMA_URL="postgresql://postgres:[PASSWORD]@db.qemrxtqtoxqmznaldfax.supabase.co:5432/postgres?pgbouncer=true"
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.qemrxtqtoxqmznaldfax.supabase.co:5432/postgres"
NEXTAUTH_SECRET="SmartCV_Hub_Secret_2026"
GROQ_API_KEY="your_groq_key"
```

---

## 📋 الخطوات التالية (يدوياً)

### 🔐 الخطوة 1: الحصول على كلمة المرور من Supabase

1. اذهب إلى: https://supabase.com/dashboard
2. اختر مشروعك
3. اذهب إلى **Settings** → **Database**
4. ابحث عن **Connection String** أو **Database Password**
5. انسخ كلمة المرور

### ✏️ الخطوة 2: تحديث ملف `.env.local`

1. افتح الملف `.env.local`:
   ```powershell
   notepad .env.local
   ```

2. استبدل `[PASSWORD]` في السطرين التاليين بكلمة المرور الحقيقية:
   ```env
   POSTGRES_PRISMA_URL="postgresql://postgres:YOUR_REAL_PASSWORD@db.qemrxtqtoxqmznaldfax.supabase.co:5432/postgres?pgbouncer=true"
   DATABASE_URL="postgresql://postgres:YOUR_REAL_PASSWORD@db.qemrxtqtoxqmznaldfax.supabase.co:5432/postgres"
   ```

3. إذا كان لديك `GROQ_API_KEY`، استبدل `your_groq_key` بالمفتاح الحقيقي

4. احفظ الملف (Ctrl + S)

---

## 🚀 الخطوة 3: الرفع إلى GitHub

بعد التأكد من أن التعديلات صحيحة، قم برفع الكود:

```powershell
# 1. إضافة جميع التغييرات
git add .

# 2. إنشاء commit
git commit -m "chore: migrate database provider to Supabase"

# 3. رفع إلى GitHub
git push origin master
```

---

## ⚙️ الخطوة 4: تكوين Netlify

بعد الرفع إلى GitHub، اذهب إلى Netlify:

1. اذهب إلى: https://app.netlify.com
2. اختر مشروعك "Cvsmart hub"
3. اذهب إلى **Site settings** → **Environment variables**
4. أضف المتغيرات التالية:

```env
POSTGRES_PRISMA_URL = postgresql://postgres:YOUR_PASSWORD@db.qemrxtqtoxqmznaldfax.supabase.co:5432/postgres?pgbouncer=true

DATABASE_URL = postgresql://postgres:YOUR_PASSWORD@db.qemrxtqtoxqmznaldfax.supabase.co:5432/postgres

NEXTAUTH_SECRET = SmartCV_Hub_Secret_2026

GROQ_API_KEY = your_groq_key
```

5. احفظ التغييرات
6. أعد نشر الموقع (Redeploy)

---

## 🧪 الخطوة 5: اختبار الاتصال محلياً

قبل الرفع، تأكد من أن الاتصال يعمل:

```powershell
# 1. توليد Prisma Client
npm run db:generate

# 2. مزامنة قاعدة البيانات (اختياري - إذا كانت قاعدة البيانات فارغة)
npm run db:push

# 3. تشغيل المشروع
npm run dev
```

إذا عمل كل شيء بنجاح، ستشاهد:
```
✓ Ready in 2.5s
○ Local:        http://localhost:3000
```

---

## 💡 نصائح تقنية (Tricks)

### ✅ استخدام pgbouncer
في Supabase، استخدام `?pgbouncer=true` في `POSTGRES_PRISMA_URL` يمنع خطأ "Too many connections" ويحسن الأداء.

### ✅ الفرق بين الرابطين
- **POSTGRES_PRISMA_URL** (مع pgbouncer): للتطبيق والاتصالات المتعددة
- **DATABASE_URL** (مباشر): للميجريشن وإدارة قاعدة البيانات

### ✅ أمان كلمة المرور
إذا كانت كلمة المرور تحتوي على رموز خاصة (`@`, `#`, `%`، إلخ)، استخدم URL encoding:
- `@` → `%40`
- `#` → `%23`
- `%` → `%25`

---

## ⚠️ استكشاف الأخطاء

### خطأ: "Can't reach database server"
- ✅ تأكد من أن كلمة المرور صحيحة
- ✅ تأكد من عدم وجود مسافات في الرابط
- ✅ تأكد من أن Supabase project ليس في وضع Paused

### خطأ: "Too many connections"
- ✅ تأكد من إضافة `?pgbouncer=true` في `POSTGRES_PRISMA_URL`

### خطأ: "Environment variable not found"
- ✅ تأكد من أن ملف `.env.local` موجود في المجلد الرئيسي
- ✅ أعد تشغيل الـ dev server بعد تعديل `.env.local`

---

## 🎯 الخطوة التالية: Phase 1 - Database Builder

بعد التأكد من أن الاتصال يعمل، يمكننا البدء في:
1. ✅ إنشاء الجداول في Supabase (Prisma Migrate)
2. ✅ إضافة بيانات تجريبية (Seeding)
3. ✅ اختبار العمليات الأساسية (CRUD)

**هل أنت جاهز للبدء في Phase 1؟** 🚀🔥
