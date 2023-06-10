<div id="docs-body" class="prose-lg p-4">
  <div class="section">
    <div class="titlepage">
      <div>
        <div>
          <h2 class="title">
            <a name="wb-performance-explain">7.4&nbsp;Visual Explain Plan</a>
          </h2>
        </div>
      </div>
    </div>
    <p>
      The visual explain feature generates and displays a visual representation of the MySQL
      <a class="ulink" href="https://dev.mysql.com/doc/refman/8.0/en/explain.html" target="_top">
        <code class="code">EXPLAIN</code>
      </a>
      statement by using extended information available in the extended JSON format. MySQL Workbench
      provides all of the
      <code class="code">EXPLAIN</code>
      formats for executed queries including the raw extended JSON, traditional format, and visual query
      plan.
    </p>
    <div class="simplesect">
      <div class="titlepage">
        <div>
          <div>
            <h3 class="title">
              <a name="wb-performance-explain-visual-usage">Visual Explain Usage</a>
            </h3>
          </div>
        </div>
      </div>
      <p>
        To view a visual explain execution plan, execute your query from the SQL editor and then
        select <span class="guilabel">Execution Plan</span>
        within the query results tab. The execution plan defaults to
        <code class="code">Visual Explain</code>
        , but it also includes a
        <code class="code">Tabular Explain</code>
        view that is similar to what you see when executing
        <a class="ulink" href="https://dev.mysql.com/doc/refman/8.0/en/explain.html" target="_top">
          <code class="code">EXPLAIN</code>
        </a>
        in the MySQL client. For information about how MySQL executes statements, see
        <a
          class="ulink"
          href="https://dev.mysql.com/doc/refman/8.0/en/using-explain.html"
          target="_top"
        >
          Optimizing Queries with EXPLAIN
        </a>
        .
      </p>
    </div>
    <div class="simplesect">
      <div class="titlepage">
        <div>
          <div>
            <h3 class="title">
              <a name="wb-performance-explain-visual-conventions">Visual Explain Conventions</a>
            </h3>
          </div>
        </div>
      </div>
      <p>
        The order of execution in a visual explain diagram is bottom to top and left to right. The
        diagram examples that follow provide an overview of the graphic, textual, and informational
        conventions used to represent aspects of the visual explain plans. For specific information,
        see:
      </p>
      <nav class="list-nav">
        <ul>
          <li>
            <a
              class="xref"
              href="wb-performance-explain.html#wb-performance-visual-explain-graphics"
              title="Graphic Conventions"
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="fill-token"
              >
                <path d="m480-160-42-43 247-247H160v-60h525L438-757l42-43 320 320-320 320Z" />
              </svg>
              <span>Graphic Conventions</span>
            </a>
          </li>
          <li>
            <a
              class="xref"
              href="wb-performance-explain.html#wb-performance-visual-explain-text-info"
              title="Textual and Informational Conventions"
            >
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                class="fill-token"
              >
                <path d="m480-160-42-43 247-247H160v-60h525L438-757l42-43 320 320-320 320Z" />
              </svg>
              <span>Textual and Informational Conventions</span>
            </a>
          </li>
        </ul>
      </nav>
      <p>
        The visual explain diagram in the first figure shows a visual representation of the
        following query.
      </p>
      <div class="copytoclipboard-wrapper" style="position: relative;">
        <pre class="pre whitespace-normal">
          <code class="language-sql whitespace-pre"><span class="token keyword">SELECT</span> <span
              class="token function">CONCAT</span><span
              class="token punctuation">(</span>customer<span
              class="token punctuation">.</span>last_name<span
              class="token punctuation">,</span> <span class="token string">', '</span><span
              class="token punctuation">,</span> customer<span
              class="token punctuation">.</span>first_name<span class="token punctuation">)</span> 
<span class="token keyword">AS</span> customer<span class="token punctuation">,</span> address<span
              class="token punctuation">.</span>phone<span
              class="token punctuation">,</span> film<span
              class="token punctuation">.</span>title <span class="token keyword">FROM</span> rental
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> customer <span
              class="token keyword">ON</span> rental<span
              class="token punctuation">.</span>customer_id <span
              class="token operator">=</span> customer<span
              class="token punctuation">.</span>customer_id
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> address <span
              class="token keyword">ON</span> customer<span
              class="token punctuation">.</span>address_id <span
              class="token operator">=</span> address<span
              class="token punctuation">.</span>address_id
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> inventory <span
              class="token keyword">ON</span> rental<span
              class="token punctuation">.</span>inventory_id <span
              class="token operator">=</span> inventory<span
              class="token punctuation">.</span>inventory_id
<span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> film <span
              class="token keyword">ON</span> inventory<span
              class="token punctuation">.</span>film_id <span
              class="token operator">=</span> film<span class="token punctuation">.</span>film_id
<span class="token keyword">WHERE</span> rental<span
              class="token punctuation">.</span>return_date <span
              class="token operator">IS</span> <span class="token boolean">NULL</span>
<span class="token operator">AND</span> rental_date <span class="token operator">+</span> <span
              class="token keyword">INTERVAL</span> film<span
              class="token punctuation">.</span>rental_duration <span
              class="token keyword">DAY</span> <span class="token operator">&lt;</span> <span
              class="token function">CURRENT_DATE</span><span
              class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">LIMIT</span> <span class="token number">5</span><span
              class="token punctuation">;</span></code></pre>
      </div>
      <div class="figure">
        <a name="wb-performance-visual-explain-example-diagram">
          <p class="title"><b>Figure&nbsp;7.7&nbsp;A Visual Explain Example</b></p>
        </a>
        <div class="figure-contents">
          <div class="mediaobject">
            <img
              src="https://dev.mysql.com/doc/workbench/en/images/wb-visual-explain-example-sakila.png"
              alt="Content is described in the surrounding text."
              style="width: 100%; max-width: 800px;"
            />
          </div>
        </div>
      </div>
      <br class="figure-break" />
      <p>
        The next visual explain diagram shows the visual representation of a query that contains a
        hash join. Prior to MySQL Workbench 8.0.22, a hash join was represented by a <code
          class="code"
        >
          block nested loop
        </code>
        diamond for queries executed by MySQL 8.0.19 (or earlier).
      </p>
      <pre class="pre whitespace-normal"> <code class="language-sql whitespace-pre">
<span class="token keyword">SELECT</span> first_name<span
            class="token punctuation">,</span>last_name
<span class="token keyword">FROM</span> actor
<span class="token keyword">FULL</span> <span class="token keyword">JOIN</span> film_actor
<span class="token keyword">WHERE</span> <span class="token string">''</span> <span
            class="token operator">=</span> film_actor<span
            class="token punctuation">.</span>actor_id<span class="token punctuation">;</span>
          </code>
        </pre>
      <div class="figure">
        <a name="wb-performance-visual-explain-hash-join-diagram">
          <p class="title"><b>Figure&nbsp;7.8&nbsp;A Visual Explain Example with a Hash Join</b></p>
        </a>
        <div class="figure-contents">
          <div class="mediaobject">
            <img
              src="https://dev.mysql.com/doc/workbench/en/images/wb-visual-explain-hash-join-sakila.png"
              alt="Content is described in the surrounding text."
              style="width: 100%; max-width: 330px;"
            />
          </div>
        </div>
      </div>
      <br class="figure-break" />
      <h4>
        <a name="wb-performance-visual-explain-graphics">Graphic Conventions</a>
      </h4>
      <div class="itemizedlist">
        <ul class="itemizedlist list-disc" type="disc">
          <li class="listitem"><p>Standard Boxes: tables</p></li>
          <li class="listitem"><p>Rounded boxes: operations such as GROUP and SORT</p></li>
          <li class="listitem"><p>Framed boxes: subqueries</p></li>
          <li class="listitem"><p>Diamonds: joins</p></li>
        </ul>
      </div>
      <h4>
        <a name="wb-performance-visual-explain-text-info">Textual and Informational Conventions</a>
      </h4>
      <div class="itemizedlist">
        <ul class="itemizedlist list-disc" type="disc">
          <li class="listitem"><p>Standard text below boxes: table (or alias) name</p></li>
          <li class="listitem"><p>Bold text below boxes: key/index that was used</p></li>
          <li class="listitem">
            <p>Number in top right of a box: number of rows used from the table after filtering</p>
          </li>
          <li class="listitem">
            <p>
              Number in top left of a box: relative cost of accessing that table (requires MySQL 5.7
              or higher)
            </p>
          </li>
          <li class="listitem">
            <p>
              Number to the right of nested loop (or hash join) diamonds: number of rows produced by
              the JOIN
            </p>
          </li>
          <li class="listitem">
            <p>
              Number above the diamonds: relative cost of the JOIN (requires MySQL 5.7 or higher)
            </p>
          </li>
        </ul>
      </div>
      <p>
        The following table shows the associated colors and descriptions used in the visual explain
        diagram. For more information about cost estimates, see <a
          class="ulink"
          href="https://dev.mysql.com/doc/refman/8.0/en/cost-model.html"
          target="_top"
        >
          The Optimizer Cost Model
        </a>
        .
      </p>
      <div class="table">
        <a name="wb-performance-explain-visual-conventions-info">
          <p class="title"><b>Table&nbsp;7.1&nbsp;Visual Explain Diagram Information</b></p>
        </a>
        <div class="table-contents">
          <table id="wb-performance-explain-visual-conventions-info">
            <colgroup>
              <col width="10%" />
              <col width="10%" />
              <col width="40%" />
              <col width="40%" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">System Name</th>
                <th scope="col">Color</th>
                <th scope="col">Text on Visual Diagram</th>
                <th scope="col">Tooltip Related Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SYSTEM</td>
                <td>Blue</td>
                <td>Single row: system constant</td>
                <td>Very low cost</td>
              </tr>
              <tr>
                <td>CONST</td>
                <td>Blue</td>
                <td>Single row: constant</td>
                <td>Very low cost</td>
              </tr>
              <tr>
                <td>EQ_REF</td>
                <td>Green</td>
                <td>Unique Key Lookup</td>
                <td>
                  Low cost -- The optimizer is able to find an index that it can use to retrieve the
                  required records. It is fast because the index search directly leads to the page
                  with all the row data
                </td>
              </tr>
              <tr>
                <td>REF</td>
                <td>Green</td>
                <td>Non-Unique Key Lookup</td>
                <td>
                  Low-medium -- Low if the number of matching rows is small; higher as the number of
                  rows increases
                </td>
              </tr>
              <tr>
                <td>FULLTEXT</td>
                <td>Yellow</td>
                <td>Fulltext Index Search</td>
                <td>Specialized FULLTEXT search. Low -- for this specialized search requirement</td>
              </tr>
              <tr>
                <td>REF_OR_NULL</td>
                <td>Green</td>
                <td>Key Lookup + Fetch NULL Values</td>
                <td>
                  Low-medium -- if the number of matching rows is small; higher as the number of
                  rows increases
                </td>
              </tr>
              <tr>
                <td>INDEX_MERGE</td>
                <td>Green</td>
                <td>Index Merge</td>
                <td>
                  Medium -- look for a better index selection in the query to improve performance
                </td>
              </tr>
              <tr>
                <td>UNIQUE_SUBQUERY</td>
                <td>Orange</td>
                <td>Unique Key Lookup into table of subquery</td>
                <td>Low -- Used for efficient Subquery processing</td>
              </tr>
              <tr>
                <td>INDEX_SUBQUERY</td>
                <td>Orange</td>
                <td>Non-Unique Key Lookup into table of subquery</td>
                <td>Low -- Used for efficient Subquery processing</td>
              </tr>
              <tr>
                <td>RANGE</td>
                <td>Orange</td>
                <td>Index Range Scan</td>
                <td>Medium -- partial index scan</td>
              </tr>
              <tr>
                <td>INDEX</td>
                <td>Red</td>
                <td>Full Index Scan</td>
                <td>High -- especially for large indexes</td>
              </tr>
              <tr>
                <td>ALL</td>
                <td>Red</td>
                <td>Full Table Scan</td>
                <td>
                  Very High -- very costly for large tables, but less of an impact for small ones.
                  No usable indexes were found for the table, which forces the optimizer to search
                  every row. This could also mean that the search range is so broad that the index
                  would be useless.
                </td>
              </tr>
              <tr>
                <td>UNKNOWN</td>
                <td>Black</td>
                <td>unknown</td>
                <td>Note: This is the default, in case a match cannot be determined</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-contents">
          <table
            cellpadding="0"
            cellspacing="0"
            style="position: fixed; top: 0px; display: none; left: 341px; width: 362px;"
          >
            <thead>
              <tr>
                <th scope="col" style="width: 126.68px;">System Name</th>
                <th scope="col" style="width: 50.6953px;">Color</th>
                <th scope="col" style="width: 82.5469px;">Text on Visual Diagram</th>
                <th scope="col" style="width: 101.078px;">Tooltip Related Information</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <br class="table-break" />
    </div>
  </div>
  <br />
</div>
