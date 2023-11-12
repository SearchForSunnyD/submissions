-- write your queries here
select * from owners full outer join vehicles on vehicles.owner_id = owners.id;

select first_name, last_name, count(*) from owners o full outer join vehicles v on v.owner_id = o.id group by o.id order by count asc;

select first_name, last_name, round(avg(v.price)) as average_price , count(*) as count from owners o inner join vehicles v on v.owner_id = o.id group by o.id having o.count >= 2 and round(avg(price)) > 10000 order by first_name desc;
