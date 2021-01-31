import createSchema from "part:@sanity/base/schema-creator"
import schemaTypes from "all:part:@sanity/base/schema-type"

// We import object and document schemas
import product from "./documents/product"
import country from "./documents/country"
import blockContent from "./objects/blockContent"
import variant from "./objects/variant"
import size from "./objects/size"
import taxon from "./objects/taxon"
import taxonomy from "./objects/taxonomy"
import catalog from "./objects/catalog"

import localeString from "./locale/String"
import localeText from "./locale/Text"
import localeBlockContent from "./locale/BlockContent"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    product,
    country,
    // When added to this list, object types can be used as
    // { type: "typename" } in other document schemas
    variant,
    size,
    taxon,
    taxonomy,
    catalog,
    blockContent,
    localeText,
    localeBlockContent,
    localeString,
  ]),
})
