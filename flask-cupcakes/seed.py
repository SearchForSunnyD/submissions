from app import app
from models import db, Cupcake

with app.app_context():
    db.drop_all()
    db.create_all()

    c1 = Cupcake(
        flavor="cherry",
        size="large",
        rating=5,
    )

    c2 = Cupcake(
        flavor="chocolate",
        size="small",
        rating=9,
        image="https://www.bakedbyrachel.com/wp-content/uploads/2018/01/chocolatecupcakesccfrosting1_bakedbyrachel.jpg",
    )

    c3 = Cupcake(
        flavor="vanilla",
        size="medium",
        rating=7,
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHSMNxYYQBWH3KHyJCJM2gIjDXLX2ojREn3Q&usqp=CAU",
    )

    c4 = Cupcake(
        flavor="strawberry",
        size="large",
        rating=8,
    )

    c5 = Cupcake(
        flavor="red velvet",
        size="small",
        rating=9,
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kNZ7Vrg5KKr-4jH7NH7lwLJVP3FXYZ4IQw&usqp=CAU",
    )

    c6 = Cupcake(
        flavor="lemon",
        size="medium",
        rating=6,
    )

    c7 = Cupcake(
        flavor="blueberry",
        size="large",
        rating=7,
    )

    c8 = Cupcake(
        flavor="mint",
        size="small",
        rating=8,
    )

    c9 = Cupcake(
        flavor="caramel",
        size="medium",
        rating=9,
    )

    c10 = Cupcake(
        flavor="banana",
        size="large",
        rating=7,
        image="https://joyfoodsunshine.com/wp-content/uploads/2022/11/banana-cupcakes-recipe-9.jpg",
    )

    db.session.add_all([c1, c2, c3, c4, c5, c6, c7, c8, c9, c10])
    db.session.commit()
