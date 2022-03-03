# "kategori tablosu insert"
insert into t_title (category_id,text) values (1,"Elektronik");


# "başlık tablosu insert"
insert into t_title (category_id,text) values (1,"Dizüstü Bilgisayar");
insert into t_title (category_id,text) values (1,"Masaüstü Bilgisayar");
insert into t_title (category_id,text) values (1,"Tablet");
insert into t_title (category_id,text) values (1,"Bilgisayar Bileşenleri");
insert into t_title (category_id,text) values (1,"Aksesuar");
insert into t_title (category_id,text) values (1,"Monitor");
insert into t_title (category_id,text) values (1,"Klavye");
insert into t_title (category_id,text) values (1,"Hoperlor");
insert into t_title (category_id,text) values (1,"Fare");
insert into t_title (category_id,text) values (1,"Cep Telefonu");
insert into t_title (category_id,text) values (1,"Kapak - Kılıf");
insert into t_title (category_id,text) values (1,"Şsrj Aleti");
insert into t_title (category_id,text) values (1,"Powebank");
insert into t_title (category_id,text) values (1,"Kablo");
insert into t_title (category_id,text) values (1,"Kulaklık");
insert into t_title (category_id,text) values (1,"Ekran Koruyucu");
insert into t_title (category_id,text) values (1,"Telefon Tutucu");
insert into t_title (category_id,text) values (1,"Akıllı Saat");

# "ürün tablosu insert"
insert into t_product (
	product_name,
    explanation,
    title_id,
    brand,
    count,
    buying_price,
    sale_price,
    star,
    trendyol_url,
    hepsiburada_url
) values("iPhone 11 64 GB","Apple iPhone 11 64 GB ios cep telefonu",10,"Apple",100,10399,10699,5,"https://www.trendyol.com/apple/iphone-11-64gb-beyaz-cep-telefonu-apple-turkiye-garantili-aksesuarsiz-kutu-p-65149494","https://www.hepsiburada.com/iphone-11-64-gb-p-HBV0000120X65");
select * from t_product;