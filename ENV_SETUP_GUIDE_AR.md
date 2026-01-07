#  دليل إعداد ملف البيئة (.env.local)

##  تم إنشاء الملف بنجاح!

الملف .env.local موجود الآن في مجلد المشروع.

---

##  الخطوات التالية:

### 1 الحصول على رابط قاعدة البيانات من Vercel

**الطريقة الأولى - من لوحة تحكم Vercel:**
1. اذهب إلى: https://vercel.com/dashboard
2. اختر مشروعك "Cvsmart hub"
3. اذهب إلى **Settings**  **Environment Variables**
4. ابحث عن المتغيرات التالية وانسخها:
   - POSTGRES_PRISMA_URL
   - POSTGRES_URL_NON_POOLING
   - GROQ_API_KEY (إذا كان موجودا)
   - UPSTASH_REDIS_REST_URL (إذا كان موجودا)
   - UPSTASH_REDIS_REST_TOKEN (إذا كان موجودا)

**الطريقة الثانية - من قاعدة بيانات Vercel Postgres:**
1. اذهب إلى: https://vercel.com/dashboard
2. اذهب إلى **Storage**  **Postgres**
3. اختر قاعدة البيانات الخاصة بمشروعك
4. اذهب إلى تبويب **Settings** أو **Quickstart**
5. انسخ الروابط من قسم **Prisma**

---

### 2 تحديث ملف .env.local

1. افتح الملف .env.local باستخدام Notepad أو VS Code:
   `
   notepad .env.local
   `

2. ابحث عن السطر:
   `
   POSTGRES_PRISMA_URL="postgres://username:password@host:5432/database?pgbouncer=true&connect_timeout=15"
   `

3. استبدل النص بالكامل (ما بين علامتي التنصيص) بالرابط الذي نسخته من Vercel

4. كرر نفس العملية لـ:
   `
   POSTGRES_URL_NON_POOLING="..."
   `

5. احفظ الملف (Ctrl + S)

---

### 3 إنشاء NEXTAUTH_SECRET

قم بتشغيل أحد الأوامر التالية لإنشاء مفتاح سري عشوائي:

**في PowerShell:**
`powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]})
`

أو استخدم هذا الموقع: https://generate-secret.vercel.app/32

ثم ضع القيمة في:
`
NEXTAUTH_SECRET="القيمة-العشوائية-هنا"
`

---

### 4 تشغيل المشروع

بعد إضافة جميع القيم المطلوبة قم بتشغيل:

`ash
# 1. توليد Prisma Client
npm run db:generate

# 2. مزامنة قاعدة البيانات (إذا لزم الأمر)
npm run db:push

# 3. تشغيل المشروع
npm run dev
`

---

##  ملاحظات مهمة:

-  الملف .env.local محمي تلقائيا بواسطة .gitignore
-  لن يتم رفعه إلى GitHub (آمن)
-  لا تشارك محتويات هذا الملف مع أحد
-  استخدم قيم مختلفة للتطوير والإنتاج

---

##  إذا واجهت مشاكل:

1. تأكد من أن الرابط يبدأ بـ postgres:// أو postgresql://
2. تأكد من عدم وجود مسافات إضافية في بداية أو نهاية الرابط
3. تأكد من أن علامات التنصيص موجودة حول الرابط
4. جرب إعادة تشغيل VS Code أو Terminal بعد التعديل

---

##  للمساعدة:

إذا كنت بحاجة لمساعدة إضافية أخبرني وسأساعدك خطوة بخطوة!

