import { CatalogItem } from "./CatalogItem/CatalogItem";

export const Catalog = ({
    spa,
}) => {
    return (
        <section id="catalog-page">
            <h1>All Spa</h1>

            {spa.map(x =>
                <CatalogItem key={x._id} {...x} />
            )}

            {spa.length === 0 && (
                <h3 className="no-spa">No spa yet</h3>
            )}
        </section>
    );
};